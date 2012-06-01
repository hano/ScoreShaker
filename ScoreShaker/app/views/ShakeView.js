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

    childViews: 'header content',

    header :M.HeaderBar.design(),

    content: M.ScrollView.design({
        childViews: 'list',
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
//                    //executed in scope of DOMWindow because no target defined
//                    action: function(itemValues, items) {
//                        //itemValues is an array because mode of selection is M.MULTIPLE_SELECTION
//                        for(var i = 0; i < itemValues.length; i++) {
//                            console.log(itemValues[i] + ' selected.');
//                        }
//                    }
                }
            }
        })
    }),

    footer: M.ToolbarView.design({
        value: 'FOOTER',
        anchorLocation: M.BOTTOM
    })

});

