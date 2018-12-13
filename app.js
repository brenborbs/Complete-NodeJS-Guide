const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

require('dotenv').config();
const app = express();

// template engines set-up:
// tell express to use pug for template, then find dir
app.set( 'view engine', 'ejs' );
app.set('views' , 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public' )))

app.use((req, res, next)=> {
User.findById('5c11a9768ddfc97c8c729c4e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

app.use( '/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User ({
        name: 'Brennon',
        email: 'brennon@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})


