require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

//creates the table in postgres
//matches the model we defined
//doesnt drop the db
sequelize.sync();
//User.sync();     this will only load user table
//User.sync({force: true});   this will drop a table   DANGER this will drop all users


app.use(bodyParser.json());

//getting the exports from the headers.js file
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));



app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));

//sending response to request
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//starting local host
app.listen(3000,function(){
	console.log("app is listening on 3000");
});






