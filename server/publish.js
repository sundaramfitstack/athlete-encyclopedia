Meteor.publish('athletes', function (){
	return Athletes.find({});
});