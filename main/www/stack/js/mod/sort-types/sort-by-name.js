define([], function(){

    return window.app.sortType.sortByName = {
        o : {
            
        }, /*-- o --*/

        initialize : function(){
            this.build.init();
        }, /*-- initialize --*/

        build : {
            init : function(){

            }, /*-- build.init --*/

            dom : function(){

            } /*-- build.dom --*/
        }, /*-- build --*/

        colorizeBlock : {
            init : function(){

            }, /*-- colorizeBlock.init --*/


        }, /*-- colorizeBlock --*/

        tile__API : {
            checkMode : function(){
                ( app.simulation.o.sortMode === 'automatic' ) ? this.__masonry() : this.__packery();
            },/*-- tile__API.checkMode --*/

            __masonry : function(){
                var self = this;

                this.o.masonryConfig = {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-item',
                    isFitWidth: true,
                    containerStyle: null,
                    originTop : false,
                    initLayout : false
                };

                ( typeof this.operation === 'function' ) ? this.operation() : null;

                app.simulation.o.masonry = $('.grid').masonry( self.o.masonryConfig );
            },/*-- tile__API. --*/

            __packery : function(){

            }/*-- tile__API. --*/
        } /*-- tile__API --*/

    }; /*-- app.sortType.sortByName --*/

});
