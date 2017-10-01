Template.AthletesDashboard.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('athletes');
	});
});

Template.AthletesDashboard.helpers({
	athletes: () => {
		return Athletes.find({});
	}
});

Template.AthletesDashboard.events({
	'click .new-athlete': function (){
		Session.set('newAthlete', true);
	}
});


// function googleChartsInitialization(){

//     google.charts.load('current', {packages: ['corechart', 'bar']});

// 	google.charts.setOnLoadCallback(drawRightY);
// }