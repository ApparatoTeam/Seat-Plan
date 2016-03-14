window.app = window.app || new Object;

require.config({
	baseUrl : './stack',
	paths : {
		jQuery : 'js/lib/jquery.min',
		Framework7 : 'js/lib/framework7.min',
		TweenMax : 'js/lib/TweenMax.min'
	 }
});

requirejs([ 'js/mod/config', 'js/lib/moment.min' ], function( obj, moment ){
	document.addEventListener('deviceready',
		( 'app' in window ) ? obj.initialize( moment ) : null
	);
});
