const express = require('express');
require('dotenv').config()
const router = express.Router()
const mongoose = require("mongoose")
const server = express();
const product = require('./Router/products.js');
const brand = require('./Router/brands.js');
const category = require('./Router/category.js');
const cart = require('./Router/cart.js');
const userAuth = require('./Router/auth.js');
const userOrder = require('./Router/order.js');
const userinfo = require('./Router/user.js')
const cors = require('cors');
var session = require('express-session');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user.js');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const extractCookies = require('./helper.js')
const path=require('path')

const opts = {}
opts.jwtFromRequest = extractCookies;
opts.secretOrKey = process.env.SECRET_KEY;
const secretKey = process.env.SECRET_KEY



const stripe = require("stripe")(process.env.STRIPE_KEY);

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("database connected")
  })

}
connectToMongo()


server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(cookieParser());
server.use(express.static('build'))



server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored

}));
server.use(passport.initialize());
server.use(passport.session());



// middleWare 
const checkUser = (req, res, next) => {
  if (passport.authenticate('jwt')) {
    next()
  }
  else {
    res.send("unauthorised")
  }

}



// routing
server.use('/products', passport.authenticate('jwt'), product);
server.use('/brands', passport.authenticate('jwt'), brand);
server.use('/categories', passport.authenticate('jwt'), category);
server.use('/cart', passport.authenticate('jwt'), cart);
server.use('/auth', userAuth);
server.use('/orders', passport.authenticate('jwt'), userOrder);
server.use('/user', passport.authenticate('jwt'), userinfo);



// using passport local 
passport.use('local', new LocalStrategy(
  { usernameField: "email" },
  async function (email, password, done) {
    try {


      // const {email}=req.body;
      let emailCheck = await User.findOne({ email: email });
      if (!emailCheck) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // In your authentication route (e.g., userAuth.js)
      const token = jwt.sign({ sub: emailCheck.id }, secretKey);

      if (await bcrypt.compare(password, emailCheck.password)) {

        return done(null, { token, status: 200 })
      }

      else {
        return done(null, false, { message: 'Incorrect password.' });
      }


    } catch (error) {
      return done(error);
    }

  }
));

// using jwt stretegy 
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    console.log(jwt_payload.sub)

    const user = await User.findOne({ _id: jwt_payload.sub })

    let newUser = { id: user.id, role: user.role }

    if (user) {
      return done(null, newUser);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error)
  }

}));


// A session 
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  })
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});





// stripe payment gateway 
server.use(express.static(path.resolve(__dirname,"build")));



server.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",

    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});






server.listen(5000, () => {
  console.log("Server started")
})