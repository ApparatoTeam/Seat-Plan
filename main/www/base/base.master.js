window.app = window.app || new Object;

require.config({
	baseUrl : './stack',
	paths : {
		jQuery : 'js/lib/jquery.min',
		Framework7 : 'js/lib/framework7.min',
		TweenMax : 'js/lib/TweenMax.min',
		moment : 'js/lib/moment.min'
	}
});

requirejs(['js/mod/configuration'], function(obj){
	obj.initialize();
});