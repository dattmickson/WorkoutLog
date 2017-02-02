module.exports = function(sequelize, DataTypes){

	return sequelize.define('log', {
		result: DataTypes.STRING,
		logType: DataTypes.STRING,
		notes: DataTypes.STRING,
		owner: DataTypes.STRING
	},{
	});
};