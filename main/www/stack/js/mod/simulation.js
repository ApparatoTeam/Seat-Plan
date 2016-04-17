define([], function(){

    window.app.simulation = null;

    return window.app.simulation = {
        o : {
            klass : null,
            sortMode : null,
            sortType : null,
            packery : null,
            __colorize : true,
        }, /*-- o --*/

        initialize : function(){
            console.log('simulation initialized...');
            this.klass();
            this.displayClassName();
            this.__back();
            this.evaluate.init();
            this.sortType.init();
        }, /*-- initialize --*/

        colorizeBlock : function( self ){
            self = this;

            if( ! this.o.__colorize ) return;

            var min = 0
            ,   max = 0
            ,   block = null
            ,   row = Math.ceil( self.o.klass.students.length / 10 ) * 10;

            for( var d = 0; d < self.o.klass.students.length; d+=1 ){
                
                for( var x = 5; x < row + 1; x += 5 ){
                    max = x;
                    min = (max - 5) + 1; // inclusive

                    if( (d+1) >= min && (d+1) <= max ){
                        block = ( min % 2 == 1 || max % 2 == 1 ) ? 'left' : 'right';
                    }

                    $('[data-dom=tile]').eq(d).attr({
                        'data-block-position' : block
                    });
                }
            }
        }, /*-- colorizeBlock --*/

        animate : {

        }, /*-- animate --*/

        screenMode : {
            PICKER : null,
            firstRun : false,


            init : function(){
                window.app.screenMode = new Object;
                this.onClick();
            },

            __default : function(){
                if( ! this.firstRun ){
                    this.PICKER.setValue(['Scale-Pan'], 300);
                }
            },

            onClick : function(self, template){
                self = this;

                template =  '<div class="toolbar">';
                template +=     '<div class="toolbar-inner">';
                template +=         '<div class="left">';
                template +=             '<label>Screen mode for touch event</label>';
                template +=         '</div>';
                template +=         '<div class="right">';
                template +=             '<a href="#" class="link close-picker"><i class="fa fa-fw fa-2x fa-check"></i></a>';
                template +=         '</div>';
                template +=     '</div>';
                template += '</div> ';

                self.PICKER = app.global.f7.o.app.picker({
                    input : $('[data-toggle-focus="dom"]'),
                    cols : [ { textAlign : 'center', values : [ 'Details', 'Recitation', 'Attendance', 'Rearrange', 'Scale-Pan' ] } ],
                    toolbarTemplate : template,
                    onChange : function( p, v, dv ){

                        if( ! self.firstRun ){
                            requirejs( [ 'js/mod/screen-mode/'+(p.value[0]).toLowerCase() ], function( obj ){
                                obj.initialize();
                                self.firstRun = true;
                            });
                        }

                    },
                    onClose : function(p){
                        //return;
                        requirejs( [ 'js/mod/screen-mode/'+(p.value[0]).toLowerCase() ], function( obj ){
                            obj.initialize();
                        });
                    }
                });

                self.__default();

                $('[data-toggle-focus="trigger"]').on('click', function(){
                    self.PICKER.open();
                    return false;
                });

            }

        }, /*-- screenMode --*/

        scaleCanvas : {
            scale  : null,
            PICKER : null,

            init : function(){
                this.calculatedHeight();
                this.onClick();
            },

            onClick : function( self, template ){
                self = this;

                self.PICKER = app.global.f7.o.app.picker({
                    input : $('[data-toggle-scale="dom"]'),
                    cols : [ { textAlign : 'center', values : ['Fit to screen', '175%', '150%', '125%', '100%', '75%', '50%'] } ],
                    onChange : function( p, v, dv ){
                        $('[data-size-control=label]').html( v );

                        TweenLite.set('[data-dom=tile-inner]', {
                            x : 0,
                            y : 0,
                            bottom : 0,
                            attr : {
                                'data-x' : 0,
                                'data-y' : 0
                            }
                        });

                        self.renderScale( v[0] );
                    }
                });

                $('[data-toggle-scale="trigger"]').on('click', function(){
                    self.PICKER.open();
                    return false;
                });
            },

            calculatedHeight : function( genderBlockHeight, tileInner ){
                genderBlockHeight = 0;
                tileInner = $('[data-dom=tile-inner]');

                if( $('[data-gender-alias').length )
                    genderBlockHeight = ( $('[data-dom=tile-right-block]').height() > $('[data-dom=tile-left-block]').height() ) ? $('[data-dom=tile-right-block]').height() : $('[data-dom=tile-left-block]').height() ;
                
                tileInnerDim = {
                    width : 0,
                    height : ( $('[data-gender-alias').length ) ? genderBlockHeight : tileInner.height()
                };

                $('[data-dom=tile-inner]').height( (tileInnerDim.height + 5) );
            }, /*-- calculatedHeight --*/

            dragStage : function( self ){
                self = this;

                interact( '[data-dom=tile-inner]' )
                .draggable({
                    restrict : { restriction : 'parent' },
                    inertia : true,
                    autoScroll: true,
                    onmove: function( event ){
                        var target = event.target
                        ,   x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                        ,   y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        TweenLite.set( target, {
                            x : x,
                            y : y,
                            scale : self.scale,
                            attr  : {
                               'data-x' : x,
                               'data-y' : y
                            }
                        });
                    }
                });

            }, /*-- dragStage --*/

            renderScale : function( pref, self, scale ){
                self = this;

                var tileInnerDim = null
                ,   verticalOffset = null
                ,   tileContainer = $('[data-dom=tile-container]')
                ,   tileInner = $('[data-dom=tile-inner]')
                ,   config = null;

                switch( pref ){
                    case '175%':
                        config = { scale : 1.75 };
                        self.scale = 1.75;
                    break;

                    case '150%':
                        config = { scale : 1.50 };
                        self.scale = 1.50;
                    break;

                    case '125%':
                        config = { scale : 1.25 };
                        self.scale = 1.25;
                    break;

                    case '100%':
                        config = { scale : 1.00 };
                        self.scale = 1.00;
                    break;

                    case '75%':
                        config = { scale : 0.75 };
                        self.scale = 0.75;
                    break;

                    case '50%':
                        config = { scale : 0.50 };
                        self.scale = 0.50;
                    break;

                    default:
                        self.scale = tileContainer.height() / tileInner.height();
                        verticalOffset = ( tileInner.height() - ( tileInner.height() * self.scale ) ) / 2;

                        config = {
                            scale : ( tileContainer.height() < tileInner.height() ) ? self.scale : 1,
                            bottom : ( tileContainer.height() < tileInner.height() ) ? -1 * verticalOffset : 0
                        };
                    break;
                }

                TweenLite.to( tileInner, 0.3, config );
                //self.dragStage( self.scale );
            }
        }, /*-- scaleCanvas --*/

        showClassDetails : {
            addon : null,

            size : function( size ){
                size = klass.students.length;
                $('[data-dom=class-size-data]').html(size);
            }, /*-- showClassDetails.size --*/

            init : function( addon ){
                this.size();
                this.sorting();
                this.addon = addon || null;
                if( typeof this.addon === 'function' ) this.addon();
            }, /*-- showClassDetails.init --*/

            sorting : function(){
                $('[data-dom-disp=sorting-mode]').children('span').html(app.simulation.o.sortMode);
                $('[data-dom-disp=sorting-type]').children('span').html(app.simulation.o.sortType);
            } /*-- showClassDetails.sorting --*/
        }, /*-- showClassDetails --*/

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
            }, /*-- evaluate.init --*/

            checkMode : function(){
                app.simulation.o.sortMode = app.simulation.o.klass.meta.sorting.mode;
            }, /*-- evaluate.checkMode --*/

            checkType : function(){
                app.simulation.o.sortType = app.simulation.o.klass.meta.sorting.type;
            } /*-- evaluate.checkType --*/
        }, /*-- evaluate --*/

        sortMode : {
            set : function( feed ){
                feed = feed || null;
                ( app.simulation.o.sortMode === 'automatic' ) ? this.automatic.init() : this.manual.init() ;
                //--> shorthand: this[app.simulation.o.sortMode].init();
                app.simulation.scaleCanvas.init();
                app.simulation.screenMode.init();
                app.simulation.showClassDetails.init( (typeof feed.addon === 'function') ? feed.addon : null );
            }, /*-- sortMode.set --*/

            automatic : {
                init : function(){
                    app.simulation.colorizeBlock();
                } /*-- sortMode.automatic.init --*/

            }, /*-- sortMode.automatic --*/

            manual : {
                init : function(){
                    console.log('sort mode: manual');
                    this.DRAGGABILLY.init();
                }, /*-- manual.init --*/

                updateTileSystem : function(){
                    app.simulation.o.packery
                    .on('dragItemPositioned', function(){
                        app.simulation.colorizeBlock();
                    }).trigger('dragItemPositioned');
                },

                DRAGGABILLY : {
                    init : function(){
                        this.instance();
                    }, /*-- manual.DRAGGABILLY.init --*/

                    instance : function(){
                        app.simulation.o.packery
                        .find('.grid-item')
                        .each( function( i, gridItem ) {
                			var draggie = new Draggabilly(gridItem, {
                                containment : '.grid'
                            });

                			app.simulation.o.packery.packery( 'bindDraggabillyEvents', draggie );
                		});

                        app.simulation.sortMode.manual.updateTileSystem();
                    } /*-- manual.DRAGGABILLY.instance --*/

                } /*-- manual.DRAGGABILLY --*/

            } /*-- sortMode.manual --*/
        }, /*-- sortMode --*/

        sortType : {
            init : function(){
                window.app.sortType = new Object;
                this.evaluate();
            }, /*-- sortType.init --*/

            evaluate : function( sortType ){
                switch ( app.simulation.o.sortType ) {
                    case 'name':
                        sortType = 'sort-by-name'
                    break;

                    case 'name-gender':
                        sortType = 'sort-by-name-gender'
                    break;

                    case 'male-right-block':
                        sortType = 'sort-by-male-right-block'
                    break;
                }
                //--> call to a file
                requirejs(['js/mod/sort-type/'+sortType], function(obj){
                    obj.initialize();
                });

                return;
            } /*-- sortType.evaluate --*/
        }, /*-- sortType --*/

        displayClassName : function( self ){
            klass = this.o.klass;
            $('[data-dom=class-name]').html( klass.meta.name );
        }, /*-- displayClassName --*/

        __back : function(){
            $('[data-back-of=simulation]')
            .on('click', function(){
                //app.global.router.init('class-overview');
                requirejs(['js/mod/router'], function(router){
                    router.initialize('class-overview');
                });
            });
        }

    } /*-- simulation --*/

});
