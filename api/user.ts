import express = require('express');
import User from '../models/user';
import Verification from '../models/Token';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import auth from '../middleware/auth';
const uniqid = require('uniqid');
import { check } from 'express-validator';
import emailVerification from '../emailTemplates/verify';
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const randomstring = require('randomstring');
router.get('/', (req: any, res: any) => {
  res.send('this is the api route for user registration')
})

router.post('/', [check('username', "name is required").not().isEmpty(), check('email', "please enter a valid Email").isEmail(), check('password', "please enter a password with atleast 6 characters").isLength({ min: 6 })], async (req: any, res: any) => {
  console.log('1');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const saltRounds = 10;
  const exist = await User.findOne({ email: req.body.email });

  if (exist) {
    console.log(req.body);
    return res.status(400).json({ msg: 'User Exists' })
  }
  else {


    try {


      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          const user = new User({
            email: req.body.email,
            password: hash,
            userName: req.body.username,
            image: req.body.image,
            isVerified: false

          })
          await user.save()
          const token = jwt.sign({
            expiresIn: 60 * 60 * 24 * 30,
            data: user.id
          }, process.env.jwt);
          const verifcation = new Verification({ token: md5(uniqid()), user: user._id });
          var transporter = nodemailer.createTransport(sendGrid({ apiKey: process.env.sendgrid }));
          var mailOptions = { from: 'noreply.paymate1@gmail.com', to: user.email, subject: 'Account Verification Token', html: emailVerification(verifcation.token) };
          const mail = await transporter.sendMail(mailOptions);
          await verifcation.save();
          return res.json({ token: token })
        });
      });
    }

    catch {
      return res.status(500).json({ error: 'server error' })
    }
  }
})
router.put('/', [auth, check('username', "name is required").not().isEmpty(), check('email', "please enter a valid Email").isEmail(), check('password', "please enter a password with atleast 6 characters").isLength({ min: 6 })], async (req: any, res: any) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const saltRounds = 10;
  const user = await User.findById(req.user);
  try {
    if (req.body.changePassword === true) {
      const salt = await bcrypt.genSalt(saltRounds);
      const password = await bcrypt.hash(req.body.password, salt);
      user.password = req.body.password;
    }

    if (user.email !== req.body.email) {
      const existing = await User.findOne({ email: req.body.email });
      if (existing) {
        return res.status(400).json({ msg: 'A user already exists with that email' });
      }
    }
    user.email = req.body.email;
    user.isVerified = false;
    try {
      await Verification.findOneAndDelete({ user: user._id });
    }
    catch (e) {
    }
    const verifcation = new Verification({ token: md5(uniqid() + user.email + randomstring.generate()), user: user._id });
    await verifcation.save();
    var transporter = nodemailer.createTransport(sendGrid({ apiKey: process.env.sendgrid }));
    var mailOptions = { from: 'noreply.paymate1@gmail.com', to: user.email, subject: 'Account Verification Token', html: emailVerification(verifcation.token) };
    await transporter.sendMail(mailOptions);
    user.userName = req.body.username;
    user.image = req.body.image;
    await user.save()
    const token = jwt.sign({
      expiresIn: 60 * 60 * 24 * 30,
      data: user.id
    }, process.env.jwt);
    return res.json({ msg: 'User Data Updated, please re-verify your account by clicking on the link sent to your email account' })
  }
  catch (e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    return res.status(500).json({ error: 'server error' })
  }
})
router.get('/:id', async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    return res.json({ msg: user })
  }
  catch {
    return res.status(500).json({ error: 'User not found' })
  }
})

module.exports = router;
export default router;