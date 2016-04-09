define([], function(){

    window.app.simulation = null;

    return window.app.simulation = {
        o : {
            klass : null,
            sortMode : null,
            sortType : null,
            masonry : null,
            packery : null
        }, /*-- o --*/

        initialize : function(){
            console.log('simulation initialized...');

            this.klass();
            this.displayClassName();
            this.__back();
            this.evaluate.init();
            this.sortType.init();
        }, /*-- initialize --*/

        colorizeBlock : function(self){
            self = this;

            var min = 0
            ,   max = 0
            ,   block = null
            ,   row = Math.ceil( self.o.klass.students.length / 10 ) * 10
            ,   d = 0;

            for( var x = 5; x < row + 1; x += 5 ){
                max = x;
                min = (max - 5) + 1; // inclusive

                if( (d+1) >= min && (d+1) <= max ){
                    block = ( min % 2 == 1 || max % 2 == 1 ) ? 'left' : 'right';
                }

                $('[data-dom=tile]').attr({
                    'data-block-position' : block
                });
                d+=1;
            }

        }, /*-- colorizeBlock --*/

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
                window.app.sortType = new Object;
                this.evaluate();
            }, /*-- sortType.init --*/

            evaluate : function( sortType ){
                switch ( app.simulation.o.sortType ) {
                    case 'name':
                        sortType = 'sort-by-name'
                        break;
                    case 'name-gender':
                        sortType = 'sort-by-name-gnder'
                        break;
                }

                //--> call to a file
                requirejs(['js/mod/sort-types/'+sortType], function(obj){
                    obj.initialize();
                });

                return;
            }, /*-- sortType.evaluate --*/

            /*-- 1. Sort by name --*/
            __sortName : {
                init : function( self ){
                    self = this;
                    app.simulation.sortMode.automatic.init(function(){
                        self.build();
                    });
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

                                /*--
                                var min = 0
                                ,   max = 0
                                ,   block = null
                                ,   row = Math.ceil( klass.students.length / 10 ) * 10;

                                for( var x = 5; x < row + 1; x += 5 ){
                                    max = x;
                                    min = (max - 5) + 1; // inclusive

                                    if( (d+1) >= min && (d+1) <= max ){
                                        block = ( min % 2 == 1 || max % 2 == 1 ) ? 'left' : 'right';
                                    }
                                }
                                --*/

                                $('[data-dom=tile-inner]').append(
                                    self.dom({
                                        blockPosition : '',
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
                        onStart : function(){
                            (app.simulation.o.masonry).masonry('reloadItems');
                        },
                        onComplete : function(){
                            app.simulation.colorizeBlock();
                            (app.simulation.o.masonry).masonry();
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

            /*-- 2. Sort by alternate gender --*/
            __sortNameGender : {
                init : function(self){
                    self = this;
                    app.simulation.sortMode.automatic.init(function(){
                        self.build();
                    });
                },/*-- sortType.__sortNameGender.init --*/

                gender : {
                    male : [],
                    female : [],
                    merged : null
                },

                build : function(self, klass, tmp){
                    self = this;
                    klass = app.simulation.o.klass;
                    tmp = [];


                    for( var s = 0; s < klass.students.length; s+=1 ){
                        tmp.push( klass.students[s].meta.name.lastName);
                    }

                    tmp = tmp.sort();

                    for( var d = 0; d < tmp.length; d+=1 ){
                        for( var e = 0; e < klass.students.length; e+=1 ){
                            if( tmp[d] ==  klass.students[e].meta.name.lastName && klass.students[e].meta.gender === 'male' ){
                                (self.gender.male).push( klass.students[e] );
                            }else if( tmp[d] ==  klass.students[e].meta.name.lastName && klass.students[e].meta.gender === 'female' ){
                                (self.gender.female).push( klass.students[e] );
                            }
                        }
                    }

                    self.gender.merged = null;

                    self.gender.merged = $.map(self.gender.male, function(v, i) {
                        if( self.gender.female[i] != undefined )
                            return [ v, self.gender.female[i] ];
                        else
                            return [ v ];
                    });

                    $('[data-dom=tile-inner]').html('');

                    for( var g = 0; g < self.gender.merged.length; g+=1 ){
                        $('[data-dom=tile-inner]').append(
                            self.dom({
                                blockPosition : 'right',
                                index  : self.gender.merged[g].index,
                                offset : self.gender.merged[g].meta.name.lastName,
                                gender : (self.gender.merged[g].meta.gender).charAt(0)
                            })
                        );
                    }

                    TweenMax.to($('[data-dom=tile-inner]'), 0.3, {
                        delay : 1.0,
                        autoAlpha : 1,
                        onStart : function(){
                            (app.simulation.o.masonry).masonry('reloadItems');
                        },
                        onComplete : function(){
                            (app.simulation.o.masonry).masonry();
                        }
                    });

                }, /*-- sortType.__sortNameGender.build --*/

                dom : function( o, dom ){
                    o = o || {
                        blockPosition : null,
                        index  : null,
                        offset : null,
                        gender : null
                    };
                    dom  = '<div data-dom="tile" class="grid-item" data-student-index="'+o.index+'" data-block-position="'+o.blockPosition+'">';
                    dom += '    <div data-dom="tile-data">';
                    dom += '        <span data-student-gender>'+o.gender+'</span>';
                    dom += '        <span data-student-offset>'+o.offset+'</span>';
                    dom += '    </div>';
                    dom += '</div>';
                    return dom;
                } /*-- sortType.__sortName.dom --*/

            } /*-- sortType.__sortNameGender --*/

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
