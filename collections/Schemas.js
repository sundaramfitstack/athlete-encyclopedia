Athletes = new Mongo.Collection('athletes');

Athletes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}

});

AthleteSchema = new SimpleSchema({
	athlete_id: {
		type : Number,
		label : 'Athlete ID'
	},
	first_name: {
		type : String,
		label : 'First Name'
	},
	last_name: {
		type : String,
		label : 'Last Name'
	},
	absolute_strength: {
		type : Number,
		label : 'Absolute Strength - UB',
		optional : true
	},
	relative_strength: {
		type : Number,
		label : 'Relative Strength - UB',
		optional : true
	},
	allometric_strength: {
		type : Number,
		label : 'Allometric Strength - UB',
		optional : true
	},
	power: {
		type : Number,
		label : 'Power (W)',
		optional : true
	},
	speed: {
		type : Number,
		label : 'Speed (m/s)',
		optional : true
	},
	acceleration: {
		type : Number,
		label : 'Acceleration (m/s^2)',
		optional : true
	},
	agility : {
		type : Number,
		label : 'Agility',
		optional : true
	},
	body_composition : {
		type : Number,
		label : 'Body Composition',
		optional : true
	},
	overall : {
		type : Number,
		label : 'Overall Score'
	}
});

Athletes.attachSchema( AthleteSchema );