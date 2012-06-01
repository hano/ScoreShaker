// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// View: ShakeView
// ==========================================================================

ScoreShaker.ShakeView = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: ScoreShaker.AppController,
            action: 'init'
        }
    },
    
    cssClass: 'ShakeView',

    childViews: 'content',

    header :M.HeaderBar.design(),

    content: M.ScrollView.design({
        childViews: 'list result footer',
        list: M.SelectionListView.design({

            /* renders a selection view like check boxes */
            selectionMode: M.SINGLE_SELECTION_DIALOG,

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            contentBinding: {
                target: ScoreShaker.AppController,
                property: 'dropdown'
            },

            events: {
                change: {
                    target: ScoreShaker.AppController,
                    action: 'gameChanged'
                }
            }
        }),

        result :M.ContainerView.design({
            cssClass: 'result',
            childViews:'homeContainer stuffContainer foreignContainer',
            homeContainer:M.ContainerView.design({
                cssClass: 'homeContainer',
                childViews: 'home',
                home:M.LabelView.design({
                    cssClass: 'home',
                    value:'2',
                    contentBinding: {
                        target: ScoreShaker.AppController,
                        property: 'homeGoals'
                    }

                })
            }),
            stuffContainer:M.ContainerView.design({
                childViews: 'stuff',
                cssClass: 'stuffContainer',
                stuff:M.LabelView.design({
                    cssClass: 'stuff',
                    value: ':'
                })
            }),
            foreignContainer:M.ContainerView.design({
                childViews: 'foreign',
                cssClass: 'foreignContainer',
                foreign:M.LabelView.design({
                    value:'3',
                    cssClass: 'foreign',
                    contentBinding: {
                        target: ScoreShaker.AppController,
                        property: 'foreignGoals'
                    }
                })
            })
        }),


        footer :M.ContainerView.design({
            childViews: 'tmp',
            cssClass: 'footer',
            events: {
                tap: {
                    //target: ScoreShaker.AppController,
                    action: function(){
                        window.open(M.I18N.l('tmpUrl'));
                    }
                }
            },
            tmp:M.LabelView.design({
                value: 'coded with The-M-Project',
                cssClass: 'imprint'
            })
        })
    })


});

