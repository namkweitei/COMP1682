const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const postRouter = require('./routes/post');
const pinRoute = require("./routes/pin");
const adminRouter = require('./routes/admin');
const guestRoute = require("./routes/guest");
const authRouter = require("./routes/auth");
const bloggerRoute = require("./routes/blogger");

const app = express();

app.use(express.json({ limit: '200mb' }));


const salt = bcrypt.genSaltSync(10);
const secret = 'bnxbcvxcnbvvcxvxcv';

// Sử dụng body-parser với giới hạn kích thước tệp
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://thanhpqgch210568:1@cluster0.gac1iv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  
app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if(passOk) {
    jwt.sign({username,id:userDoc._id}, secret, {}, (err, token) => {
      if(err) throw err;
      res.cookie('token', token).json({id:userDoc._id,username,});
    });
  } else {
    req.status(400).json('wrong credentials')
  }
});


app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if(err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
})

app.get('/editprofile', async (req, res) => {
  const userId = req.params;
  const userDoc = await User.findById(userId);
  res.json(userDoc);
});

// app.put('/editprofile', async (req, res) => {
//   const  = req.body;
// });

app.use(pinRoute);
app.use(postRouter);
app.use(guestRoute);
app.use(adminRouter);
app.use(bloggerRoute);
app.use(authRouter);

app.listen(4000);