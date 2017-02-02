$(function(){
	$.extend(WorkoutLog, {
		log: {
			workouts: [],

			setDefinitions: function() {
				var defs = WorkoutLog.definition.userDefinitions;
				var len = defs.length;
				var opts;
				for (var i = 0; i< len; i++){
					opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
				}
				$("#log-type").children().remove();
				$("#log-type").append(opts);
			},

			setHistory: function(){
				var history = WorkoutLog.log.workouts;
				var len = history.length;
				var lis = "";
				for (var i = 0; i<len; i++){
					lis += "<li class='list-group-item'>" + history[i].logType + " - " + history[i].result +"</li>";
				}
			},


			create: function() {
				var itsLog = {
					result: $("#log-result").val(),
					logType: $("#log-type option:selected").text(), 
					note: $("#log-notes").val()
				};
				var postData = { log: itsLog };
				var newLog = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				newLog.done(function(data){
					WorkoutLog.log.workouts.push(data.log);
					console.log("you added a log!");
					console.log(data);
				});
			},

			fetchAll: function() {
				var fetchLogs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				});
				fetchLogs.done(function(data){
					WorkoutLog.log.workouts = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}

			
		}
	});

	//bindings
	$("#log-save").on("click", WorkoutLog.log.create);

	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.log.fetchAll();
	}
	//fetch definitions if we already are authenticated and refreshed
	
});