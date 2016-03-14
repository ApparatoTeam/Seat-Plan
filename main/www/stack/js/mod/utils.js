define([], function(){

  return window.app.utils = {
    o : {

    }, /*-- utils.o --*/

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
     } /*-- utils.physicalButtons --*/



  };

});
