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

    /* properties for content binding */
    homeGoals: '',
    foreignGoals: '',

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
        var endResult = result.split(':');

        this.set('homeGoals', endResult[0]);
        this.set('foreignGoals', endResult[1]);
    },

    updateVies: function(obj){

        this.set('events', obj.events);
        this.set('dropdown', obj.dropdown);
    },

    initViews: function(){
        var _events = this.getLocalStorageValue('events');
        var _dropdown = this.getLocalStorageValue('dropdown');
        if(_events && _dropdown){
            this.updateVies({
                'events' : _events,
                'dropdown' : _dropdown
            });
        }

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

        this.updateVies({
            'events' : _events,
            'dropdown' : _dropdown
        });
        this.setLocalStorageValue(_events, 'events');
        this.setLocalStorageValue(_dropdown, 'dropdown');
        this.setLocalStorageValue(M.Date.create().date.getTime(), 'syncDate');

    },

    setHeaderTitle: function(title){
        this.set('headerTitle', title);
    },

    setLocalStorageValue: function(value, name) {
        var _key = name ? name : M.Date.create().date.getTime();
        var key = this.buildStorageKey(_key);
        localStorage.setItem(key, JSON.stringify(value));
    },

    buildStorageKey: function(key) {
        return M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + key;
    },

    getLocalStorageValue: function(name) {
        var key = this.buildStorageKey(name);
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    }

});
