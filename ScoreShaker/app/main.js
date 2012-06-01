// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker 
// ==========================================================================

var ScoreShaker  = ScoreShaker || {};

ScoreShaker.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'page1',

    page1: M.PageView.design({

        events: {
            pageshow: {
                target: ScoreShaker.AppController,
                action: 'init'
            }
        },

        childViews: 'header',
        header :M.HeaderBar.design()

    })

});