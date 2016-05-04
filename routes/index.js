var express = require('express');
var router = express.Router();
var mongoUrl = 'mongodb://localhost:27017/coffee';
var mongoose = require('mongoose');
var Account = require('../models/accounts');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect(mongoUrl);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// GET route for the register page
router.get('/register', function(req, res, next){
	res.render("register", {failure: req.query.failure})
});

//POST route for register
router.post('/register', function(req, res, next){
	//the user posted: username, email, password, password2
	if(req.body.password != req.body.password2){
		res.redirect('/register?failure=password')
	}else{
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddress: req.body.email
		});
		newAccount.save();
		req.session.username = req.body.username;
		res.redirect('/options');
		//res.render("register", {})
	}
});

router.get('/login', function(req, res, next){
	res.render("login", {page: 'login'});
});

router.post('/login', function(req, res, next){

	Account.findOne(
		{username: req.body.username},
		function(err, doc){
			var loginResult = bcrypt.compareSync(req.body.password, doc.password);
			if(loginResult){
				req.session.username = req.body.username;
				res.redirect('/options');
			}else{
				res.redirect('/login?failure=password');
			} 
		});
});

router.get('/options', function(req, res, next){
	if (!req.session.username){
		res.redirect('/login');
	}else{
		res.render('options', {username: req.session.username})
	}
});

module.exports = router;
