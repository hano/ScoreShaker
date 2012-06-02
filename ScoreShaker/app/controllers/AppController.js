// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: AppController
// ==========================================================================

ScoreShaker.AppController = M.Controller.extend({

    /* sample controller property */
    headerTitle:'',
    events:'',
    dropdown:'',
    currentGameId:'',

    /* properties for content binding */
    homeGoals:'',
    foreignGoals:'',

    init:function (isFirstLoad) {
        if (isFirstLoad) {

            ScoreShaker.DeviceController.init();

            var events = ScoreShaker.RemoteController.initialLoad();
            if (events) {
                this.eventModel(events);
            }

        }
        this.setHeaderTitle('ScoreShaker');
    },

    gameChanged:function (id) {
        this.currentGameId = id;
        this.shaked();
    },

    getGameById:function (id) {
        return this.events[id];
    },

    getGameDetail:function (id, detail) {
        var game = this.getGameById(id);
        return game['details'][detail];
    },

    getGameName:function (id) {
        return this.getGameDetail(id, 'name');
    },

    getGameParticipants:function (id) {
        return this.getGameDetail(id, 'participants');
    },

    getGameCombo:function (id) {
        var game = this.getGameById(id);
        if (game && game['non_live'] && game['non_live']['games'] && game['non_live']['games'].length && game['non_live']['games'][0] && game['non_live']['games'][0]['results'] && game['non_live']['games'][0]['results'].length >= 3) {
            return game['non_live']['games'][0]['results'];
        }
    },

    testOutput:function (id) {
        console.log(id);
        console.log(this.getGameById(id));
        console.log(this.getGameName(id));
        console.log(this.getGameParticipants(id));
        console.log(this.getGameCombo(id));
    },

    displayResult:function (result) {
        var endResult = result.split(':');

        this.set('homeGoals', endResult[0]);
        this.set('foreignGoals', endResult[1]);
    },

    updateViews:function (obj) {

        this.set('events', obj.events);
        this.set('dropdown', obj.dropdown);
        this.currentGameId = M.ViewManager.getView('shakeView', 'list').getSelection();
    },

    initViews:function () {
        var _events = this.getLocalStorageValue('events');
        var _dropdown = this.getLocalStorageValue('dropdown');
        if (_events && _dropdown) {
            this.updateViews({
                'events':_events,
                'dropdown':_dropdown
            });
        }

    },

    eventModel:function (events) {
        var _events = {};
        var _dropdown = [];
        var first = true;
        Object.keys(events).forEach(function (ind) {
            var data = events[ind]['details']['name'];
            var id = events[ind]['eventids'][0]['id'];
            var event = {};
            event['value'] = id;
            event['label'] = data;
            if (data.split('Euro 2012').length < 2) {
                //_events.push(events[ind]);
                _events[id] = events[ind];
                _dropdown.push(event);
                if(first){
                    console.log(events[ind]);
                    first = false;
                }
            }

        });

        this.updateViews({
            'events':_events,
            'dropdown':_dropdown
        });

        this.setLocalStorageValue(_events, 'events');
        this.setLocalStorageValue(_dropdown, 'dropdown');
        this.setLocalStorageValue(M.Date.create().date.getTime(), 'syncDate');

    },

    setHeaderTitle:function (title) {
        this.set('headerTitle', title);
    },

    setLocalStorageValue:function (value, name) {
        var _key = name ? name : M.Date.create().date.getTime();
        var key = this.buildStorageKey(_key);
        localStorage.setItem(key, JSON.stringify(value));
    },

    buildStorageKey:function (key) {
        return M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + key;
    },

    getLocalStorageValue:function (name) {
        var key = this.buildStorageKey(name);
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    },

    /*********/



    changeBgColor:function (ident) {
        $(ident).css('background', 'rgba(255, 255, 255, 0.5)');
    },

    getOdds: function(res){
        var ret = [];
        ret[0] = res[0]['odds'];
        ret[1] = res[1]['odds'];
        ret[2] = res[2]['odds'];
        return ret;
    },

    shaked:function () {
        //this.testOutput(this.currentGameId);
        var res = this.getGameCombo(this.currentGameId);
        var odds = this.getOdds(res);
        this.displayResult(ScoreShaker.CalculatorController.calculateGame(odds[0], odds[1], odds[2]));
        this.changeBgColor('.ui-content');
    },

    toggleResult: function(){
        var hide = 'hide';
        var duration = 'slow';
        var resultId = M.ViewManager.getView('shakeView','result').id;
        var jRes = $('#' + resultId);
        if(jRes.hasClass(hide)){
            jRes.fadeIn(duration);
            jRes.removeClass(hide);

        }else{
            jRes.fadeOut(duration);
            jRes.addClass(hide);
        }
    },

    showResult:function(){

    }


});
