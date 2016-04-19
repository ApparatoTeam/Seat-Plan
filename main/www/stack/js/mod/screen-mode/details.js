define([], function(){

    return window.app.screenMode.details = {
        o : {
        	PICKER : null,
            queue : []
        }, /*-- o --*/

        initialize : function(){
            this.setTileMode();
            app.simulation.tileInteraction.init();
        	this.popup();
        }, /*-- initialize --*/

        setTileMode : function(){
            if( 'attendance' in app.screenMode )
                app.screenMode.attendance.__reset();

            $('[data-tile-mode]').each(function(){
                $( this ).off('click');
                $(this).attr('data-tile-mode', 'details');
            });
        },

        popup : function( self, studentIndex ){
            self = this;

            $('[data-tile-mode=details]').on('click', function(e){
                studentIndex = $(this).data('student-index');
        	   (app.global.f7.o.app).pickerModal('[data-student-expanded=container]');

               e.stopImmediatePropagation();
               e.preventDefault();
            });
            //.trigger('click');
            
            ( app.global.f7.o.dom('[data-student-expanded=container]') )
            .on('opened', function(){
                self.__data.init( studentIndex );
                self.recitation.interface( studentIndex );
            });
        }, /*-- main --*/

        recitation : {

            interface : function( studentIndex, self ){
                self = this;

                TweenLite.to('[data-recitation-input=wrapper]', 0.3, {
                    autoAlpha : ( $('[data-student-index='+studentIndex+']').data('absent') ) ? 0.3 : 1,
                    pointerEvents : ( $('[data-student-index='+studentIndex+']').data('absent') ) ? 'none' : 'auto',
                    onComplete : function(){
                        self.submit( studentIndex );
                    }
                });
            },

            submit : function( studentIndex, value, o ){
                $('[data-recitation-input=record]').on('click', function(e){
                    o = {};

                    value = $('[data-recitation-input=textbox]').val();
                    o[ JSON.stringify( $('[data-student-index='+studentIndex+']').data('student-index') ) ] = value;

                    (app.simulation.o.klass['recitation'][app.simulation.o.session]) = o;

                    console.log(app.simulation.o.klass['recitation']);

                    e.stopImmediatePropagation();
                    e.preventDefault();
                });
            }

        }, /*-- recitation --*/

        __data : {
            init : function( ref ){
                this.getInstance( ref );
            },

            getInstance : function( studentIndex, klass ){
                klass = app.simulation.o.klass;

                for( var a = 0; a < klass.students.length; a+=1 ){
                    if( studentIndex == klass.students[a]['index'] ){
                        $('[data-student-expanded=student-name]').html( '<i class="fa fa-fw fa-user"></i> '+klass.students[a]['meta']['name']['firstName'] +'&nbsp;'+ klass.students[a]['meta']['name']['lastName'] );
                        $('[data-student-expanded=studentID]').html( klass.students[a]['meta']['studentID'] );
                        $('[data-student-expanded=gender]').html( klass.students[a]['meta']['gender'] );
                        $('[data-student-expanded=attendance]').html( ( $('[data-student-index='+studentIndex+']').data('absent') ) ? 'Absent' : 'Present' );

                    }
                }

            }
        }

    }; /*-- screenMode.details --*/

});
