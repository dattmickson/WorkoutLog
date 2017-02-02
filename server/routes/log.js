var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');
var Log = sequelize.import('../models/log');

router.post('/', function(req,res){
	//variables
	var result = req.body.log.result;
	var logType = req.body.log.logType;
	var notes = req.body.log.notes;
	var owner = req.user.id;

	//methods
	Log 
		//create success
		.create({
			result: result,
			logType: logType,
			notes: notes,
			owner: owner
		})
		.then(
			function createSuccess(log){
				res.json(log);
				
			},
			function createError(err){
				res.send(500,err.message);
			}
		);
});

router.get('/', function(req, res){
	var userid = req.user.id;

	Log
	.findAll({
		where: { owner: userid }
	})
		.then(
			function findAllSuccess(data){
				//console.log(data);
				res.json(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
})

router.delete('/', function(req, res){
	var data = req.body.log.id;
	Log
		.destroy({
			where: { id: data }
		}).then(
			function deleteLogSuccess(data){
				res.send("you removed a log");
			},
			function deleteLogError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;