import User from '../models/user';
import jwt = require('jsonwebtoken');
// import config from 'config';
const auth = async (req, res, next) => {
       try {
              const token = req.header('x-auth-token');
              var decoded = await jwt.verify(token, process.env.jwt);
              req.user = decoded.data;
              next();
       }
       catch {
              return res.status(401).json({ msg: "incorrect token, can not authenticate" })
       }
}
export default auth;