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

		 }, /*-- initialize --*/

		preload : {
			o : {
				status : true,
				log    : null,
				tween  : null
			 },

			init : function(){
				( this.o.status ) ? this.done() : this.detection();
			 },

			animation : function( duration, ease ){
				duration = 0.5;
				ease = Expo.easeInOut;

				this.o.tween = new TimelineMax({ repeat : 0, yoyo : true });

				
			 },

			detection : function( self ){
				self = this;

				self.animation();

				return this;
			 },

			accessLog : function(){


				return this;
			 },

			done : function(){
				// instantiate app.page object
				window.app.page = {};
				// activate theme framework
				app.config.f7.init();

				return;
			 }

		}, /*-- preload --*/

		f7 : {
			o : {
				app  : null,
				dom  : null,
				view : null
			 },

			init : function(){
				this.o.app = new Framework7({ 
					material : true 
				 });

				this.o.view = (this.o.app).addView('.main-view', {});
			 },

			view : function(){

			 }

		 }, /*-- f7 --*/

		route : function(){

			//(app.config.f7.o.view).router.load();

		 } /*-- route --*/

	 }; /*-- app.config --*/

});