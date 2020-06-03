var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('profile', {user: req.user});
});

router.get('/gitprofile',isLoggedIn, function(req, res, next) {
  res.render('gitprofile', {user: req.user});
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/facebook/auth', passport.authenticate('facebook'));

// the callback after google has authenticated the user
router.get('/facebook/auth/redirect',
  passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);

router.get('/github/auth', passport.authenticate('github'));

// the callback after google has authenticated the user
router.get('/github/auth/redirect',
  passport.authenticate('github', {
    successRedirect : '/gitprofile',
    failureRedirect : '/'
  })
);

// can be written in separate file like other projects I have done.
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;