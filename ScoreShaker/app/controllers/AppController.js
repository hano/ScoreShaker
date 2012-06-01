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

            var events = ScoreShaker.RemoteController.initialLoad();
            this.eventModel(events);
        }
        this.setHeaderTitle('ScoreShaker');
    },

    eventModel: function(events){
        Object.keys(events).forEach(function(){

        });
    },

    setHeaderTitle: function(title){
        this.set('headerTitle', title);
    }

});
