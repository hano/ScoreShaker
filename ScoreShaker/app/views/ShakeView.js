// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// View: ShakeView
// ==========================================================================

ScoreShaker.ShakeView = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events:{
        pageshow:{
            target:ScoreShaker.AppController,
            action:'init'
        }
    },

    cssClass:'ShakeView',

    childViews:'content',

    header:M.HeaderBar.design(),

    content:M.ScrollView.design({
        childViews:'flagContainer list resultContainer shakeBtnContainer footer',
        list:M.SelectionListView.design({
            cssClass:'list',
            /* renders a selection view like check boxes */
            selectionMode:M.SINGLE_SELECTION_DIALOG,

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            contentBinding:{
                target:ScoreShaker.AppController,
                property:'dropdown'
            },

            events:{
                change:{
                    //target:ScoreShaker.AppController,
                    action:function (gameId) {
                        //WTF but it doesnt work in a native container otherwise - don't ask me
                        CURRENTGAMEID = gameId;
                        ScoreShaker.AppController.gameChanged();
                    }
                }
            }
        }),

        flagContainer:M.ContainerView.design({
            cssClass: 'flags',
            childViews:'homeFlag foreignFlag',
            homeFlag:M.ContainerView.design({
                cssClass: 'homeFlag',
                value:''
            }),
            foreignFlag:M.ContainerView.design({
                cssClass: 'foreignFlag',
                value:''
            })
        }),

        resultContainer:M.ContainerView.design({

            cssClass:'resultContainer',
            childViews:'result',

            result:M.ContainerView.design({
                cssClass:'result hide',
                childViews:'homeContainer stuffContainer foreignContainer',
                homeContainer:M.ContainerView.design({
                    cssClass:'homeContainer',
                    childViews:'home',
                    home:M.LabelView.design({
                        cssClass:'home',
                        value:'2',
                        contentBinding:{
                            target:ScoreShaker.AppController,
                            property:'homeGoals'
                        }

                    })
                }),
                stuffContainer:M.ContainerView.design({
                    childViews:'stuff',
                    cssClass:'stuffContainer',
                    stuff:M.LabelView.design({
                        cssClass:'stuff',
                        value:':'
                    })
                }),
                foreignContainer:M.ContainerView.design({
                    childViews:'foreign',
                    cssClass:'foreignContainer',
                    foreign:M.LabelView.design({
                        value:'3',
                        cssClass:'foreign',
                        contentBinding:{
                            target:ScoreShaker.AppController,
                            property:'foreignGoals'
                        }
                    })
                })
            })


        }),

        shakeBtnContainer:M.ContainerView.design({

            childViews:'shakeBtn',

            shakeBtn:M.ButtonView.design({
                value:M.I18N.l('shake'),
                events:{
                    tap:{
                        //target:ScoreShaker.AppController,
                        action:function () {
                            ScoreShaker.AppController.shaked();
                        }
                    }
                }
            })

        }),


        footer:M.ContainerView.design({
            childViews:'tmp',
            cssClass:'footer',
            events:{
                tap:{
                    //target: ScoreShaker.AppController,
                    action:function () {
                        window.open(M.I18N.l('tmpUrl'));
                    }
                }
            },
            tmp:M.LabelView.design({
                value:M.I18N.l('coded'),
                cssClass:'imprint'
            })
        })
    })


});

