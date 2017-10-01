Template.AthleteDetails.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('athletes');
	});
});

Template.AthleteDetails.helpers({
	
	athlete: () => {
		
		const id = FlowRouter.getParam('id');

		let athlete = Athletes.findOne({"athlete_id": id});

		return athlete;
	}
});


