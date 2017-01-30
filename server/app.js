var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', 'drpepper?', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

//build a user model in sqllize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});

//creates the table in postgres
//matches the model we defined
//doesnt drop the db
User.sync();
//User.sync({force: true});   this will drop a table

app.use(bodyParser.json());

//create api endpoint
app.post('/api/user', function(req,res){
	//when we post to api user, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;
	
	//match the model we create above
	//sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		//Sequelize is going to return the object it created from the db.
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

//getting the exports from the headers.js file
app.use(require('./middleware/headers'));

//sending response to request
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//starting local host
app.listen(3000,function(){
	console.log("app is listening on 3000");
});






