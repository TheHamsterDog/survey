//imports
const express: any = require('express');
require('dotenv').config()
import helmet = require('helmet');
import path = require('path');
import cors = require('cors')
import db from './config/db';
import user from './api/user';
import auth from './api/auth';
import post from './api/post';
//constants
const app: any = express();
const PORT = process.env.PORT ||  process.env.port
//Handling routes
app.use(express.json({ extended: false, limit: '50000kb' }));
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
//setting up security features
// app.use(helmet());
// app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


//setting up express and mongoDB

db();
//starting up the server on the port specified
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
