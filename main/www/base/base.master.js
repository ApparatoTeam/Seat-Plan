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
		Framework7 : 'js/lib/framework7.min',
		TweenMax : 'js/lib/TweenMax.min'
	}
});

/*--
 - Non-module, global and static app.router
 --*/
window.app.global = {
	meta : {
		os : {
			name : 'android',
			min_version : '4.4'
		},
		max_student : 70
	}, /*-- meta --*/

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
		ref : null,
		callback : null,
		delay : 500,

		init : function( page, test, callback ){
			this.page = page;
			test = test || false;
			this.callback = callback;
			( !test ) ? this.interface() : this.test();
		}, /*--; app.router.init --*/

		test : function(){
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
		},

		interface : function( self, ref ){
			self = this;
			self.ref = app.global.f7.o.view.activePage.name;

			(app.global.f7.o.view).router.load({
				url : self.dom
			});

			window.setTimeout(function(){
				self.terminal();
			}, self.delay );

			return;
		}, /*--; app.router.dispatch --*/

		neutralizePageCache : function( self, obj ){
			//if( this.ref !== 'simulation' ) return;
			self = this;
			obj = ( (self.ref).split('-')[1] == undefined ) ? self.ref : (self.ref).replace( /\-+\w/g, ((self.ref).match(/\-+\w/g)[0]).charAt(1).toUpperCase() );
			console.log('neutralized: '+ obj);
			//require.undef('js/mod/'+self.ref+'.js');
			window.app[obj] = {};
			//$('[data-page='+self.ref+']').remove();
		}, /*-- router.neutralizePageCache --*/

		terminal : function( self ){
			self = this;

			console.log('to: '+ self.page);
			self.neutralizePageCache();

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
