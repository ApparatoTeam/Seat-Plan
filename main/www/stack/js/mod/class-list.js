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

        dom : function( o, dom ){

            o = o || {
                index : null,
                offset : null,
                className : null,
                sorting : null,
                studentCount : null
            };

            dom =  '<li data-dom="class" class="swipeout" data-class-index="'+ o.index +'">';
            dom += '    <div class="swipeout-content">';
            dom += '        <a class="item-content item-link" href="#">';
            dom += '            <div class="item-inner">';
            dom += '                <div class="item-title-row">';
            dom += '                    <div class="item-title" data-dom="class-name"><span>'+o.offset+'</span>'+ o.className +'</div>';
            dom += '                    <div class="item-after class-meta-wrap">';
            dom += '                        <span class="class-meta class-meta-student">'+ o.studentCount +'</span>';
            dom += '                        <span class="class-meta class-meta-sort-type">'+ o.sorting +'</span>';
            dom += '                    </div>';
            dom += '                </div>';
            dom += '            </div>';
            dom += '        </a>';
            dom += '    </div>';

            dom += '    <div class="swipeout-actions-right">';
            dom += '        <a class="bg-orange link" href="#">';
            dom += '            <i class="fa fa-fw fa-user-plus"></i>';
            dom += '        </a>';
            dom += '        <a class="swipeout-delete link" href="#">';
            dom += '            <i class="fa fa-fw fa-trash"></i>';
            dom += '        </a>';
            dom += '    </div>';
            dom += '</li><!--/ eo class -->';

            return dom;
        }, /*-- dom --*/

        operation : {
            init : function(){
                this.add.init();
                this.list.init();
            }, /*--; operation.init --*/

            list : {
                init : function(){
                    this.__load();
                }, /*-- operation.list.init --*/

                __load : function(){
                    var x = 0
                    ,   klass = null;

                    $('[data-dom=class-list]').html('');

                    for(var key in localStorage){
                        if( key.match(/\-\-class\-/) ){ //--> per class
                            klass = JSON.parse( localStorage[key] );

                            $('[data-dom=class-list]').append(
                                app.classList.dom({
                                    index : klass.index,
                                    offset : ( x + 1 ),
                                    className : klass.meta.name,
                                    sorting : klass.meta.sorting.mode,
                                    studentCount : klass.students.length
                                })
                            );
                            x += 1;
                        }
                    }

                    if( x < 1 ){
                        $('.no-class-alert').show();
                        return;
                    }

                    app.classList.operation.redirect.init();

                    return;
                } /*-- operation.list.__load --*/

            }, /*-- operation.list --*/

            redirect : {
                init : function(){
                    this.userEvent();
                },

                userEvent : function( self ){
                    self = this;

                    $('[data-dom=class]').on('click', function( e ){
                        localStorage['--active-class'] = $(this).data('class-index');

                        self.__route();

                        e.stopImmediatePropagation();
                        e.preventDefault();
                    });
                },

                __route : function(){
                    app.global.router.init('class-overview');
                }
            }, /*-- operation.redirect --*/

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
                        app.global.router.init('class-create');
                    } /*--; operation.add.formMedia.init --*/
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
        } /*-- search --*/

    }; /*-- classList --*/
});
