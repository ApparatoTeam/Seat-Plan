define([], function(){

    return window.app.classOverview = window.app.classOverview || {
        o : {
            rAF : null,
            klass : null
        }, /*-- o --*/

        initialize : function(){
            this.__load.init();
            this.actions.init();
        }, /*-- initialize --*/

        actions : {
            init : function(){
                this.simulate();
                this.student.init();
                this.__back();
            },

            simulate : function(){
                $('[data-class-action=simulate]').on('click', function(){
                    app.global.router.init('simulation');
                    $(this).off('click');
                });
            },

            student : {
                init : function(){
                    this.enlist();
                },

                enlist : function(){
                    $('[data-student=enlist]').on('click', function(){
                        app.global.router.init('student-create');
                    });
                }
            },

            __back : function(){
                $('[data-back-of=class-overview]')
                .on('click', function(){
                    app.global.router.init('class-list', false, function(){
                        localStorage['--active-class'] = null;
                    });
                });
            }

        }, /*-- misc --*/

        __load : {
            init : function(){
                this.klass();
                this.classData();
                this.studentData.init();
            }, /*-- __load.init --*/

            klass : function(){
                for(var key in localStorage){
                    if( key == localStorage['--active-class']){
                        app.classOverview.o.klass = localStorage['--active-class'];
                    }
                }
            }, /*-- __load.klass --*/

            classData : function( klass ){
                klass = JSON.parse( localStorage[app.classOverview.o.klass] );

                $('[data-class=name]').html(klass.meta.name);
                $('[data-class=schedule]').children('span').html(klass.meta.schedule);
                $('[data-class=sorting-mode]').children('span').html(
                    ( klass.meta.sorting.mode ).charAt(0).toUpperCase() + ( klass.meta.sorting.mode ).slice(1) + ', ' + klass.meta.sorting.type
                );
                $('[data-class=student-count]').children('span').html(klass.students.length);

                return;
            }, /*-- __load.classData --*/

            studentData : {
                init : function(){
                    this.populate();
                }, /*-- __load.studentData.init --*/

                populate : function( self, klass ){
                    self = this;
                    $('[data-dom=student-list]').html('');

                    for(var key in localStorage){
                        if(  key == localStorage['--active-class'] ){
                            klass = JSON.parse( localStorage[key] );

                            for(var s = 0; s < klass.students.length; s+=1 ){
                                $('[data-dom=student-list]').append(
                                    self.dom({
                                        offset : ( s + 1 ),
                                        studentName : klass.students[s].meta.name.firstName + ' ' + klass.students[s].meta.name.middleName + ' ' + klass.students[s].meta.name.lastName
                                    })
                                );
                            }

                        }
                    }

                }, /*-- __load.studentData.populate --*/

                dom : function( o, dom ){
                    o = o || {
                        offset : null,
                        studentName : null
                    };

                    dom =  '<li class="swipeout">';
                    dom += '    <div class="swipeout-content">';
                    dom += '        <div class="item-content">';
                    dom += '            <div class="item-media">';
                    dom += '                <div class="chip">';
                    dom += '                    <div class="chip-media bg-orange">'+ o.offset +'</div>';
                    dom += '                </div>';
                    dom += '            </div>';
                    dom += '            <div class="item-inner">'+ o.studentName +'</div>';
                    dom += '        </div>';
                    dom += '    </div>';

                    dom += '    <div class="swipeout-actions-right">';
                    dom += '        <a data-student-action="activity" href="#">';
                    dom += '            <i class="fa fa-fw fa-line-chart"></i>';
                    dom += '        </a>';

                    dom += '        <a data-student-action="remove" class="swipeout-delete link" href="#">';
                    dom += '            <i class="fa fa-fw fa-close"></i>';
                    dom += '        </a>';
                    dom += '    </div>';
                    dom += '</li>';

                    return dom;
                }, /*-- __load.studentData.dom --*/

            } /*-- __load.studentData --*/

        }, /*-- __load --*/

    }; /*-- classOverview --*/

});
