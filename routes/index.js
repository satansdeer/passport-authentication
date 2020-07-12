var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if(err){
      return next(err)
    }
    if(!user){
      return res.send("Wrong email or password")
    }
    req.login(user, () => {
      res.send("You are authenticated")
    })
  })(req, res, next)
})

router.get("/secret", (req, res) => {
  if(req.isAuthenticated()) {
    res.send("You are authorized to see this private page")
  } else {
    res.status(403).send("Access denied")
  }
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
})

module.exports = router;
