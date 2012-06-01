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
    events : '',
    dropdown: '',

    init: function(isFirstLoad) {
        if(isFirstLoad) {

            var events = ScoreShaker.RemoteController.initialLoad();
            if(events){
                this.eventModel(events);
            }

        }
        this.setHeaderTitle('ScoreShaker');
    },

    gameChanged: function(id){

        this.displayResult(ScoreShaker.CalculatorController.calculateGame());
    },

    displayResult: function(result){

    },

    eventModel: function(events){
        var _events = [];
        var _dropdown = [];
        Object.keys(events).forEach(function(ind){
            var data = events[ind]['details']['name'];
            var id = events[ind]['eventids'][0]['id'];
            var event = {};
            event['value'] = id;
            event['label'] = data;
            if(data.split('Euro 2012').length < 2){
                _events.push(events[ind]);
                _dropdown.push(event);
            }

        });
        this.set('events', _events);
        this.set('dropdown', _dropdown);
    },

    setHeaderTitle: function(title){
        this.set('headerTitle', title);
    }

});
