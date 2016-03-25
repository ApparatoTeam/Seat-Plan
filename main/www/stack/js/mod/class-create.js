define([], function(){

    return window.app.classCreate = window.app.classCreate || {
        o : {}, /*-- o --*/

        initialize : function(){
            this.pickerInstance.init();
        }, /*-- initialize --*/

        validateSubmission : {
            
        },

        pickerInstance : {
            o : {},

            init : function(){
                this.set();
            },

            set : function(){

                this.o['sorting-mode'] = app.global.f7.o.app.picker({
                    input : $('[data-field=sorting-mode]'),
                    cols : [ { textAlign : 'center', values : ['Automatic', 'Manual'] } ]
                });

                this.o['sorting-type'] = app.global.f7.o.app.picker({
                    input : $('[data-field=sorting-type]'),
                    cols : [
                        {
                            textAlign : 'center',
                            values : ['Name', 'Name-Gender', 'Male-Right-Block', 'Female-Right-Block']
                        }
                        /*-- { textAlign : 'right', values : ['Ascending', 'Descending'] } --*/
                    ]
                });

            }
        }, /*-- pickerInstance --*/


    };

});
