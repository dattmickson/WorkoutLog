var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

//creates the table in postgres
//matches the model we defined
//doesnt drop the db
User.sync();
//User.sync({force: true});   this will drop a table   DANGER this will drop all users

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






