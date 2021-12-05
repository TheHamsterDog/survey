import express = require('express');
import User from '../models/user';
import bcrypt from 'bcrypt';
import forgot from '../emailTemplates/forgot';
// import config from 'config';
import uniqid from 'uniqid';
import forgotpassword from '../models/forgot';
import Token from '../models/Token';
import emailVerification from '../emailTemplates/verify';
import auth from '../middleware/auth';
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid');
import { check } from 'express-validator';
var jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const md5 = require('md5');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/', [check('email', "please enter a valid Email").isEmail(), check('password', "please enter a password with atleast 6 characters").isLength({ min: 6 })], async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const saltRounds = 10;
  const user: any = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ msg: 'User Doesn\'t Exist' })
    console.log('can\'t find user ');

  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign({
        expiresIn: 60 * 60 * 24 * 30,
        data: user.id
      }, process.env.jwt);
      return res.json({ token: token });
    }
    else {
      console.log('wrong password')
      return res.status(401).send('incorrect credentials')

    }
  });
});
router.get('/', auth, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(401).send("User Not Found")
    }
    return res.json({ user })
  }
  catch {
    return res.status(401).json({ err: 'User not found' });
  }

})
router.get('/confirmation/:t', async function (req, res) {


  console.log(req.params.t);

  Token.findOne({ token: req.params.t }, function (err, token) {
    console.log(req.params.t);
    console.log(token);
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

    // If we found a token, find a matching user
    User.findOne({ _id: token.user }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        const payload = {
          user: {
            id: user.id
          }
        }
        res.redirect('http://localhost:3000/');
      });
    });
  });
});
router.get('/resend/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    console.log('resend requested');
    console.log(id);

    const token = await Token.findOne({ user: id });
    console.log(token);
    if (!token) {
      const user = await User.findById(id);
      const verifcation = new Token({ token: md5(uniqid() + user.email + randomstring.generate()), user: user._id });
      await verifcation.save();

      var transporter = nodemailer.createTransport(sendGrid({ apiKey: process.env.sendgrid }));
      var mailOptions = { from: 'personal@shreshthverma.me', to: user.email, subject: 'Account Verification Token', html: emailVerification(verifcation.token) };
      const mail = await transporter.sendMail(mailOptions);
      console.log(verifcation);

      return res.json({ msg: 'Email has been resent' })
    }
    else {
      const user = await User.findById(id);
      var transporter = nodemailer.createTransport(sendGrid({ apiKey: process.env.sendgrid }));
      var mailOptions = { from: 'personal@shreshthverma.me', to: user.email, subject: 'Account Verification Token', html: emailVerification(token.token) };
      const mail = await transporter.sendMail(mailOptions);
      return res.json({ msg: 'Email has been resent' })
    }



  }
  catch {
    return res.status(500).json({ msg: 'Token Not Found' });
  }
})
router.post('/forgotpassword/', [check('email', 'please specify your email account')], async (req, res) => {
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      var transporter = nodemailer.createTransport(sendGrid({ apiKey: process.env.sendgrid }));
      const FP = new forgotpassword({
        token: md5(uniqid() + user.email + randomstring.generate({
          length: 20,
          charset: 'alphabetic'
        })), user: user._id
      });
      var mailOptions = { from: 'personal@shreshthverma.me', to: user.email, subject: 'Password Reset', html: forgot(FP.token) };
      await transporter.sendMail(mailOptions);
      console.log('====================================');
      console.log('Forgot Route');
      console.log('====================================');
      await FP.save();
    }
    return res.json({ msg: 'We will send instructions about how to recover your account, on your specified email id, if there is an account associated with it' });
  }
  catch (e) {
  }
})
router.post('/resetpassword/:id', [check('password', 'you need to specify your new password')], async (req, res) => {
  const FP = await forgotpassword.findOne({ token: req.params.id });
  if (FP) {
    const user = await User.findById(FP.user);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    user.password = password;
    await user.save();
    console.log('Successfull reset');
    await FP.delete();
    return res.json({ email: user.email, msg: 'Your password has been updated successfully' });
  }
  else {
    console.log('invalid Token');

    return res.status(400).json({ msg: 'Your reset token is invalid', real: false });
  }
})
router.get('/resetpassword/:id', async (req, res) => {
  const FP = await forgotpassword.findOne({ token: req.params.id });
  if (FP) {
    return res.json({ real: true });
  }
  else {
    console.log('wrong')
    return res.status(400).json({ real: false });
  }
})

module.exports = router;
export default router;