if (Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('athletes-dashboard');	
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');	
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	if (! Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name : 'home',
	action(){
		if (Meteor.userId()){
			FlowRouter.go('athletes-dashboard');
		}
		//GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/athletes-dashboard', {
	name : 'athletes-dashboard',
	action(){
		//GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main:"AthletesDashboard"});
	}
});

FlowRouter.route('/athlete/:id', {
	name : 'athlete',
	action(){
		BlazeLayout.render('MainLayout', {main:"AthleteDetails"});
	}
});
