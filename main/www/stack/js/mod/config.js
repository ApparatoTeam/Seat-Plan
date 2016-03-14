define(function( require ){

	'use strict';

	require('jQuery');
	require('TweenMax');
	require('Framework7');

	return window.app.config = window.app.config || {

		api : {
			moment : null
		 },

		initialize : function( moment ){
			this.api.moment = moment;
			this.preload.init();

			requirejs(['js/mod/utils'], function( utils ){
				utils.physicalButtons.init(function(){
						alert('back button triggered');
						return false;
				 });
			 });

		 }, /*-- initialize --*/

		preload : {
			o : {
				status : true,
				log    : null,
				tween  : null,
				rAF		 : null,
				steps  : 2
			}, //--; preload.o

			init : function(){
				this.start.frontendFramework();
				( this.o.status ) ? this.done() : this.start.init();
			}, //--;preload.init

			start : {
				init : function(){
					app.config.preload.done();
					//--! do all checks here
					this.checkAndroidOS();
					this.checkCacheSystem();
				 },

				frontendFramework : function(){
					// activate theme framework
					app.config.f7.init();
					//app.config.preload.o.steps += 1;
				 },

				checkAndroidOS : function( self, min, ua ){
					self = this;
					min = 4.2;
					ua = window.navigator.userAgent;

					if( parseFloat( ua.match(/Android\s+([\d\.]+)/)[1] ) < min ){
							app.config.preload.failed({
									notice : 'Android OS version is not supported. KitKat 4.4+ required.'
							 });
							return;
					 }

					 app.config.preload.o.steps += 1;
				 },

				checkCacheSystem : function(){
						if( ! 'localStorage' in window ){
							app.config.preload.failed({
									notice : 'Working cache system is not supported by the device.'
							 });
							 return;
						 }

						 app.config.preload.o.steps += 1;
				 }

			}, //--; preload.start

			accessLog : function(){

				return this;
			}, //--; preload.accessLog

			done : function( rAF, self ){
				self = this;

				function checkValidity(){
					//console.log('check at step'+app.config.preload.o.steps);
					app.config.preload.o.rAF = window.requestAnimationFrame(checkValidity);
					if( app.config.preload.o.steps == 2 ){
						self.initServices.init();
						window.cancelAnimationFrame( app.config.preload.o.rAF );
					}
				}
				checkValidity();
				return;
			}, //--; preload.done

			failed : function( param ){
					param = param || {
						notice : 'Error unknown'
					};

					window.cancelAnimationFrame( app.config.preload.o.rAF );
					app.config.preload.o.status = false;

					( new TimelineLite )
					.to('.app-name-word', 0.3, {
						marginLeft: 0,
						marginRight: 0
					})
					.to('.preloader', 0.3, { autoAlpha : 0 });

					app.config.f7.o.app.addNotification({
						message : param.notice,
						button : {
								text: 'Exit',
								color : 'white'
						 },
						onClose : function(){
								navigator.app.exitApp();
						 }
					});
			 }, //--; preload.failed

			 initServices : {

 				init : function(){
					window.app.page = {};
					app.config.preload.offview.init();
 				 },

 				 protocols : {
 					 checkUser : function(){
						 app.config.user.init();
						 //console.log('checking user...');
					 },

					 checkInternetConnection : function(){
						 //console.log('checking net...');
					  }
					 //... & network connection etc
 				  }

 			 }, /*--; preload.initServices --*/

			 offview : {
				 init : function(){
					 this.animation();
				  },

					animation : function( self, delay ){
						self = this;
						delay = 0.0;

						( new TimelineLite({
								onComplete : function(){
									//--> clearing
									self.clear();
									//--> start protocols
									self.startProtocols();
								 }
						 }) )
						.to('.app-name-word', 0.3, {
							delay : delay,
							marginLeft: 0,
							marginRight: 0
						})
						.to('.preloader', 0.3, { autoAlpha : 0 }, 'fade-off')
						.staggerTo('.app-name-word', 0.3, {
								autoAlpha : 0
						 }, 0.1, 'fade-off')
						 .to('#preparatory-wrap', 0.5, {
							 y : '100%',
							 autoAlpha : 0,
							 ease : Expo.easeInOut
						 }, 'fade-off+=0.2');

						 return;
					 },

					clear : function(){
						app.config.preload.o.status = true;
						if( $('#preparatory-wrap').length )
							$('#preparatory-wrap').remove();

						return;
					 },

					startProtocols : function( obj ){
						obj = app.config.preload.initServices.protocols;
						//app.config.preload.initServices.protocols
						for( var protocols in obj ){
							( obj[protocols] ).call([]);
						 }

						 return;
					 }

			 } /*--; preload.offview --*/

		}, /*-- preload --*/

		user : {
			o : {
					index	: 'user',
					fname : null,
					lname : null,
					new	  : true
			 },

			callback : null,

			init : function( callback ){
				this.callback = callback;
				this.checkExisting();
			}, /*--; user.init --*/

			checkExisting : function( self ){
				self = this;

				if( window.localStorage.getItem( self.o.index ) != undefined ){
					self.o.new = false;
					app.config.bootstrap.init();
					return;
				}else{
						self.o.new = true;
						this.createNew.init();
				 }

			 }, /*--; user.checkExisting --*/

			createNew : {
				o : {
						userFormWrap : $('#user-form-wrap'),
						userFormHeader : $('.user-form-header'),
						userFormField : $('[data-user-field]'),
						userFormSave : $('[data-user-button=save]'),
						tween : new TimelineLite
				 },

				init : function(){
					( this.showForm() ).play();
				}, /*--; user.createNew.init --*/

				showForm : function( self, n ){
					self = this;
					n = 1;

					self.o.tween
					.to( self.o.userFormWrap, 0.7, {
						autoAlpha : 1
					 }, 'show-form-wrap')
					.staggerTo('.user-form-anim-prop', 0.3, {
						y : '0%',
						autoAlpha : 1,
						onComplete: function(){
								if( n == 3 ) self.data.saving();
									//app.config.bootstrap.init();
								n+=1;
						 }
					 }, 0.2, 'show-form-wrap')
					.pause();

					return self.o.tween;
				}, /*--; user.createNew.showForm --*/

				error : function(){

						app.config.f7.o.app.addNotification({
							message : 'Please complete the form field',
							button : {
									text : 'Dismiss'
							 }
						 });

						 window.setTimeout(function(){
							 	app.config.f7.o.dom('.close-notification').trigger('click');
						  }, 5000);
				 },

				data : {
					item  : 0,
					token : [],
					regex : new RegExp('\w', 'ig'),

					saving : function( self ){
						self = this;

						( app.config.user.createNew.o.userFormSave )
						.on('click', function( e ){

							self.input();

							if ( self.token.length == self.item ) {
								localStorage.setItem(
									'--user',
									self.token[0] + '+' + self.token[1]
								);

								app.config.bootstrap.init();
							} else {
								app.config.user.createNew.error();
							}

							e.stopImmediatePropagation();
							e.preventDefault();
						 });
					 },

					input : function( self ){
						self = this;
						self.item = 0;
						self.token = [];

						( app.config.user.createNew.o.userFormField )
						.each(function(){

							if( typeof $(this).val() != 'undefined' && $(this).val() !== '' ){
								self.token.push( $(this).val() );
							 }

							self.item += 1;
						 });

						 return;
					 }

				 } /*--; user.createNew.data --*/

			} /*--; user.createNew --*/

		}, /*-- user --*/

		// TODO: show navbar and components
		bootstrap : {
				init : function(){
					console.log('Program started....');
				 },
		 },

		f7 : {
			o : {
				app  : null,
				dom  : Dom7,
				view : null
			 },

			init : function(){
				this.o.app = new Framework7({
					material : true
				 });

				this.o.view = (this.o.app).addView('.main-view', {});
			 },

			view : function(){ }

		}, /*-- f7 --*/


	 }; /*-- app.config --*/

});
