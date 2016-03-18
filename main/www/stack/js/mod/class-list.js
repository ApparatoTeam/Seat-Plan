define([], function(){

  return window.app.classList = window.app.classList || {

    o : {
      rAF : null
    }, /*-- o --*/

    initialize : function(){
        this.showUtils.init();
        this.operation.init();
        this.search.init();
    }, /*-- initialize --*/

    showUtils : {
        init : function(){
            this.navbar();
            this.addClassButton();
            this.pageContent();
        },

        navbar : function(){
            TweenLite.to('[data-page=class-list] .navbar', 0.3, {
                y : '0',
                 autoAlpha : 1
            });
            return;
        },

        addClassButton : function(){
            TweenLite.to('#add-class-wrap', 0.3, {
                scale : 1,
                autoAlpha : 1
            });
            return;
        },

        pageContent : function(){
            TweenLite.to('[data-page=class-list] .page-content', 0.3, {
                autoAlpha : 1
            });
        }
    }, /*-- showUtils --*/

    operation : {
        init : function(){
          this.add.init();

        }, /*--; operation.init --*/

       add : {
         init : function( self ){
           this.media();
         }, /*--; operation.add.init --*/

         media : function( self ){
           self = this;

           $('[data-add-class]').on('click', function( e ){

             ( ( $(this).data('add-class') ).match(/method-file-feed/) ) ? self.feedMedia.init() : self.formMedia.init();

             e.stopImmediatePropagation();
             e.preventDefault();
            });

           return;
         }, /*--; operation.add.media --*/

         formMedia : {
           init : function(){
             console.log('form media');
            }, /*--; operation.add.formMedia.init --*/


          }, /*--; operation.add.formMedia --*/

         feedMedia : {
           init : function(){
            console.log('feed media');
            }
          } /*--; operation.add.feedMedia --*/

       }, /*--; operation.add --*/

     }, /*-- operation --*/

     search : {
        init : function(){
          this.event();
        }, /*--; search.init --*/

        event : function( self ){
          self = this;

          $('#search-trigger')
          .on('click', function(e){

            TweenLite.to('.searchbar', 0.3, {
                autoAlpha : 1,
                y : '0%',
                onCompleteParams : [ '{self}' ],
                onComplete : function( tween ){
                  self.on();
                  self.off( tween );
                 }
             });

             e.stopImmediatePropagation();
             e.preventDefault();
           });

          return;
        }, /*--; search.event --*/

        on : function(){
          (app.global.f7.o.app).searchbar('.searchbar', {
              searchList : '.list-block-search',
              searchIn : '.item-title'
           });

           return;
         },

        off : function( tween ){
            $('#search-off').on('click', function(){
                $('input[type=search]').val('');
                tween.reverse();
             });
         }

     }, /*-- search --*/

  }; /*-- classList --*/
});
