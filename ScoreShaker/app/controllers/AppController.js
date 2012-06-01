// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: AppController
// ==========================================================================

ScoreShaker.AppController = M.Controller.extend({

    /* sample controller property */
    headerTitle: '',

    init: function(isFirstLoad) {
        if(isFirstLoad) {

        }
        this.setHeaderTitle('ScoreShaker');
    },

    setHeaderTitle: function(title){
        this.set('headerTitle', title);
    }

});
