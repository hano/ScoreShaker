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
            childViews:'winnerContainer stuffContainer looserContainer',
            winnerContainer:M.ContainerView.design({
                childViews: 'winner',
                winner:M.LabelView.design({
                    value:'2',
                    contentBinding: ScoreShaker.AppController.winner
                })
            }),
            stuffContainer:M.ContainerView.design({
                childViews: 'stuff',
                stuff:M.LabelView.design({
                    value:':',
                    contentBinding: ScoreShaker.AppController.stuff
                })
            }),
            looserContainer:M.ContainerView.design({
                childViews: 'looser',
                looser:M.LabelView.design({
                    value:'3',
                    contentBinding: ScoreShaker.AppController.looser
                })
            })
        }),


        footer :M.ContainerView.design({
            childViews: 'tmp',
            tmp:M.LabelView.design({
                value: 'coded with The-M-Project'
            })
        })
    }),


});

