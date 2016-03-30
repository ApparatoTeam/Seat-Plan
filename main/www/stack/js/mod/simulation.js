define([], function(){

    return window.app.simulation = {
        o : {
            klass : null,
            sortMode : null,
            sortType : null,
            masonry : null
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

        sortType : {
            init : function(){
                this.lead();
            },

            lead : function(){
                switch ( app.simulation.o.sortType ) {
                    case 'name':
                        this.__sortName.init();
                        break;
                }

                return;
            }, /*-- sortType.lead --*/

            __sortName : {
                init : function(){
                    this.gridSystem();
                    this.build();
                },

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

                            console.log(tmp[d]);

                            if( tmp[d] ==  klass.students[e].meta.name.lastName ){
                                $('[data-dom=tile-inner]').append(
                                    self.dom({
                                        index  : klass.students[e].index,
                                        offset : klass.students[e].meta.name.lastName
                                    })
                                );
                            }

                        }

                    }

                    console.log(tmp);

                    TweenMax.to($('[data-dom=tile-inner]'), 0.3, {
                        delay : 1.0,
                        autoAlpha : 1,
                        onComplete : function(){
                            app.simulation.o.masonry.layout();
                        }
                    });

                    return;
                },

                dom : function( o, dom ){
                    o = o || {
                        index  : null,
                        offset : null
                    };

                    dom  = '<div data-dom="tile" class="grid-item" data-student-index="'+o.index+'">';
                    dom += '    <div data-dom="tile-data">';
                    dom += '        <span data-student-offset>'+o.offset+'</span>';
                    dom += '    </div>';
                    dom += '</div>';

                    return dom;
                },

                gridSystem : function(){
                    requirejs(['js/lib/masonry.pkgd.min'], function( Masonry ){

                        app.simulation.o.masonry = new Masonry('.grid', {
                          itemSelector: '.grid-item',
                          columnWidth: '.grid-item',
                          isFitWidth: true,
                          containerStyle: null,
                          originTop : false,
                          initLayout : false
                        });

                    });
                }

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
