define(function( require ){

	'use strict';

	require('TweenMax');
	require('Framework7');

	return window.app.configuration = {

		initialize : function(){
			
			this.prelod.init();

		 }, /*-- initialize --*/

		preload : {

			init : function(){
				this.featureDetection();
			 },

			featureDetection : function( self ){
				self = this;


			 },

			accessLog : function(){

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