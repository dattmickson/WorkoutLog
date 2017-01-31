module.exports = function(sequalize, DataTypes){
	//wit define, the first argument is going to represent a column in the db table

	return sequalize.define('definition', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING, //by time, reps, weight
		owner: DataTypes.INTEGER
	},{
	});
};