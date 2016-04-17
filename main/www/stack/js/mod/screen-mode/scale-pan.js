define([], function(){

    return window.app.screenMode.scalePan = {
        o : {
        	SCALE_PICKER : null
        }, /*-- o --*/

        initialize : function(){
        	return;
        	this.main.init();
        	this.sub.init();
        }, /*-- initialize --*/

        main : {
        	init : function(){
        		this.control();
        	},

        	control : {
        		interface : function(){

        		}
        	}

        }, /*-- main --*/

        sub : {
        	init : function(){

        	}, /*-- sub.init --*/

        	control : {
        		interface : function( dom ){

        		}
        		
        	}

        }, /*-- sub --*/

    }; /*-- screenMode.scalePan --*/

});
