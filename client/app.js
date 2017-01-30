$(document).ready(function(){
	$("#testAPI").on("click", function(){
		console.log("it is working");
	});

	//requesting info from api/test
	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	});
	//if it works, console.log the data
	test.done(function(data){
		console.log(data);
	});
	test.fail(function(){
		console.log("oh no!");
	});
});

