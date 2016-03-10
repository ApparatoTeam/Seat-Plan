define(function( require ){

	'use strict';

	require('TweenMax');
	require('Framework7');

	return window.app.configuration = {

		initialize : function(){
			
			this.preload.init();

		 }, /*-- initialize --*/

		preload : {

			init : function(){
				this.featureDetection().accessLog();
			 },

			featureDetection : function( self ){
				self = this;

				window.setTimeout(function(){
					console.log('First chain');

					return self;
				 }, 2000);

				return this;
			 },

			accessLog : function(){

				console.log('Second chain');

				return this;
			 }

		}, /*-- preload --*/

		f7 : {
			o : {
				app  : null,
				dom  : null,
				view : null
			 },

			init : function(){

			 },


		 } /*-- f7 --*/

	 }; /*-- app.configuration --*/

});