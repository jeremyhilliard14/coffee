var express = require('express');
var router = express.Router();
var mongoUrl = 'mongodb://localhost:27017/coffee';
var mongoose = require('mongoose');
var Account = require('../models/accounts');
mongoose.connect(mongoUrl);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// GET route for the register page
router.get('/register', function(req, res, next){
	res.render("register", {})
});

//POST route for register
router.post('/register', function(req, res, next){
	//the user posted: username, email, password, password2
	var newAccount = new Account({
		username: req.body.username,
		password: req.body.password,
		emailAddress: req.body.emailAddress
	});
	newAccount.save();
	res.json(req.body)
	//res.render("register", {})
});

module.exports = router;
