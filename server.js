var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var Yelp = require('yelp');
var configYelp = require('./config/yelp.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var configAuth = require('./config/auth.js');
var configDB = require('./config/database.js');
var mongojs = require('mongojs');
var db = mongojs(configDB.url,configDB.collections);
var favicon = require('serve-favicon');

var yelp = new Yelp({
  consumer_key: configYelp.consumer_key,
  consumer_secret: configYelp.consumer_secret,
  token: configYelp.token,
  token_secret: configYelp.token_secret,
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'theeeusnightlifeapp'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));


require('./routes.js')(app, yelp, passport, db);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.listen(port, function(){
  console.log('App listening on port '+port);
})