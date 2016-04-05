define([], function(){

    return window.app.simulation = {
        o : {
            klass : null,
            sortMode : null,
            sortType : null,
            masonry : null,
            packery : null
        }, /*-- o --*/

        initialize : function(){
            this.klass();
            this.displayClassName();
            this.__back();
            this.evaluate.init();
            this.sortType.init();
        }, /*-- initialize --*/

        klass : function(){
            for(var key in localStorage){
                if( key == localStorage['--active-class']){
                    this.o.klass = JSON.parse( localStorage[key] );
                }
            }
            return;
        }, /*-- klass --*/

        evaluate : {
            init : function(){
                this.checkMode();
                this.checkType();
            },

            checkMode : function(){
                app.simulation.o.sortMode = app.simulation.o.klass.meta.sorting.mode;
            },

            checkType : function(){
                app.simulation.o.sortType = app.simulation.o.klass.meta.sorting.type;
            }

        }, /*-- evaluate --*/

        sortMode : {

            automatic : {
                o : {
                    masonryConfig : null
                },

                callback : null,

                init : function( callback ){
                    this.callback = callback;
                    this.__API_masonry();
                },

                __API_masonry : function(){
                    var self = this;

                    this.o.masonryConfig = {
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-item',
                        isFitWidth: true,
                        containerStyle: null,
                        originTop : false,
                        initLayout : true
                    };

                    if( typeof this.callback === 'function' )
                        this.callback();

                    app.simulation.o.masonry = $('.grid').masonry( self.o.masonryConfig );

                }

            }, /*-- sortMode.automatic --*/

            manual : {
                o : {},
                callback : null,
                init : function(){},

                __API_packery : function(){
                    param = {
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-item',
                        isFitWidth: true,
                        containerStyle: null,
                        originTop : false
                    };

                    app.simulation.o.packery = $('.grid').packery(param);

                    $('.grid').children('.grid-item')
                    .each(function(index, element){
                        $('.grid').packery(
                            'bindDraggabillyEvents',
                            ( new Draggabilly( element, {
                                containment : true
                            }) )
                        );
                    });

                }
            } /*-- sortMode.manual --*/

        }, /*-- sortMode --*/

        sortType : {
            init : function(){
                this.evaluate();
            }, /*-- sortType.init --*/

            evaluate : function(){
                switch ( app.simulation.o.sortType ) {
                    case 'name':
                        this.__sortName.init();
                        break;
                    case 'name-gender':
                        this.__sortNameGender.init();
                }
                return;
            }, /*-- sortType.evaluate --*/

            /*-- 1. Sort by name --*/
            __sortName : {
                init : function( self ){
                    self = this;
                    /// this.__gridAPI();
                    app.simulation.sortMode.automatic.init(function(){
                        self.build()
                    });
                    //this.build();
                }, /*-- sortType.__sortName.init --*/

                build : function( self, klass, tmp ){
                    self = this;
                    klass = app.simulation.o.klass;
                    tmp = [];

                    for( var s = 0; s < klass.students.length; s+=1 ){
                        tmp.push( klass.students[s].meta.name.lastName);
                    }

                    tmp = tmp.sort();

                    $('[data-dom=tile-inner]').html('');

                    for( var d = 0; d < tmp.length; d+=1 ){

                        for( var e = 0; e < klass.students.length; e+=1 ){

                            if( tmp[d] ==  klass.students[e].meta.name.lastName ){
                                //console.log('-----'+tmp[d]);
                                /// eval if left block or right block append actions
                                var min = 0
                                ,   max = 0
                                ,   block = null;

                                for( var x = 5; x < klass.students.length + 1; x += 5 ){
                                    max = x;
                                    min = (max - 5) + 1; // inclusive

                                    if( (d+1) >= min && (d+1) <= max ){
                                        console.log(max);
                                        block = ( min % 2 == 1 || max % 2 == 1 ) ? 'left' : 'right';
                                    }

                                }

                                $('[data-dom=tile-inner]').append(
                                    self.dom({
                                        blockPosition : block,
                                        index  : klass.students[e].index,
                                        offset : klass.students[e].meta.name.lastName
                                    })
                                );

                            } /*-- this student --*/
                        } /*-- end loop sorted students --*/
                    } /*-- end loop students --*/

                    TweenMax.to($('[data-dom=tile-inner]'), 0.3, {
                        delay : 1.0,
                        autoAlpha : 1,
                        onComplete : function(){

                        }
                    });

                }, /*-- sortType.__sortName.build --*/

                dom : function( o, dom ){
                    o = o || {
                        blockPosition : null,
                        index  : null,
                        offset : null
                    };
                    dom  = '<div data-dom="tile" class="grid-item" data-student-index="'+o.index+'" data-block-position="'+o.blockPosition+'">';
                    dom += '    <div data-dom="tile-data">';
                    dom += '        <span data-student-offset>'+o.offset+'</span>';
                    dom += '    </div>';
                    dom += '</div>';
                    return dom;
                } /*-- sortType.__sortName.dom --*/

            }, /*-- sortType.__sortName --*/

        }, /*-- sortType --*/

        displayClassName : function( self ){
            klass = this.o.klass;
            $('[data-dom=class-name]').html( klass.meta.name );
        }, /*-- displayClassName --*/

        __back : function(){
            $('[data-back-of=simulation]')
            .on('click', function(){
                app.global.router.init('class-overview');
            });
        }

    } /*-- simulation --*/

});

/*--
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-item',
  isFitWidth: true,
  originTop : false
});
--*/
