var express = require("express");
var app = express();

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

