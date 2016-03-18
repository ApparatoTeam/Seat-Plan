/*--
 - Namespace initialized and reserved
 --*/
window.app = window.app || new Object;

/*--
 - Config setup
 --*/
require.config({
	baseUrl : './stack',
	paths : {
		jQuery : 'js/lib/jquery.min',
		Framework7 : 'js/lib/framework7.min',
		TweenMax : 'js/lib/TweenMax.min'
	}
});

/*--
 - Non-module, global and static app.router
 --*/
window.app.global = {
	f7 : {
		o : {
			app  : null,
			dom  : null,
			view : null
		},

		init : function(){
			this.o.app = new Framework7({ material : true });
			this.o.dom = Dom7;
			this.o.view = (this.o.app).addView('.main-view', {});
		}
	}, /*-- f7 --*/

	router : {
		dom : './pages/router.html',
		page : null,
		callback : null,
		delay : 700,

		init : function( page, callback ){
			this.page = page;
			this.callback = callback;
			this.interface();
		}, /*--; app.router.init --*/

		interface : function( self ){
			self = this;

			(app.global.f7.o.view).router.load({
				url : self.dom
			});

			window.setTimeout(function(){
				self.terminal();
			}, self.delay );

			return;
		}, /*--; app.router.dispatch --*/

		terminal : function( self ){
			self = this;

			(app.global.f7.o.view).router.load({
				url : './pages/'+ self.page +'.html'
			});

			app.global.f7.o.dom(document).on(
				'pageAfterAnimation',
				'.page[data-page='+self.page+']',
				function(){
					requirejs(['js/mod/'+self.page], function(obj){
						$('[data-page=router]').remove();
						obj.initialize();
					});
				}
			);

			return;
		}

	}, /*-- app.global.router --*/

	moment : {
		o : null,
		init : function( self ){
			self = this;
			requirejs(['js/lib/moment.min'], function(moment){
				app.global.moment = moment;
			});
			return;
		}
	}, /*-- app.global.moment --*/

	physicalButtons : {
		o : {},
		callback : null,

		init : function( callback ){
			if( typeof callback !== 'function') return;
			this.callback = callback;
			this.delegate.call([]);
		},

		delegate : function( self ){
			self = this;
			document.addEventListener('backbutton', function(){
				self.callback();
			});
		}
	} /*-- app.global.physicalButtons --*/

}; /*-- app.global --*/

/*--
 - Start config module
 --*/
requirejs([ 'js/mod/config' ], function( obj ){
	document.addEventListener('deviceready',
		( 'app' in window ) ? obj.initialize() : null
	);
});
