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
            this.eventModel(events);
        }
        this.setHeaderTitle('ScoreShaker');
    },

    eventModel: function(events){
        var _events = [];
        var _dropdown = [];
        Object.keys(events).forEach(function(ind){
            var event = {};
            var data = events[ind]['details']['name'];
            event['value'] = data;
            event['label'] = data;
            if(data.split('Euro 2012').length >= 2){
                event['isSelected'] = YES;
            }
            _events.push(events[ind]);
            _dropdown.push(event);
        });
        this.set('events', _events);
        this.set('dropdown', _dropdown);
    },

    setHeaderTitle: function(title){
        this.set('headerTitle', title);
    }

});
