
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

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: NativeController
// ==========================================================================

ScoreShaker.NativeController = M.Controller.extend({

    shaked: function(){
        alert('Called from container');
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: PageController
// ==========================================================================

ScoreShaker.PageController = M.Controller.extend({

    pageStack : [],

    gotoPage: function(pageName){
        this.pageStack.push(M.ViewManager.getCurrentPage());
        ScoreShaker.PageController.switchToPage(pageName);
    },

    goBack: function(){
        var prev =  this.pageStack.pop();
        if(prev){
            SRMDummy.PageController.switchToPage(prev);
        }
    }
    /*
    ,

    gotoDashboardPage: function(){
        SRMDummy.PageController.gotoPage('dashboardPage');
    },
    gotoLoginPage: function(){
        location.reload();
    },
    gotoListPage: function(){
        SRMDummy.PageController.gotoPage('listPage');
    },
    gotoMailDetailPage: function(){
        SRMDummy.PageController.gotoPage('mailDetailPage');
    }    */

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: RemoteController
// ==========================================================================

var BASE_URL = 'local';

ScoreShaker.RemoteController = M.Controller.extend({

    initialLoad: function(){
        var events = this.validate(group_a);
        return events;
    },


    validate: function(data){

        if(data && data.response && data.response.items && data.response.items.events){

            return data.response.items.events;
        }

    },

    send:function (obj, onsucc, onerror) {

        var that = this;

        if(obj){
            obj['sessionId'] = this.sessionId;
        }


        M.Request.init({
            url: BASE_URL,
            method: obj.xhrmethod ? obj.xhrmethod : 'GET',
            isJSON:YES,
            data: {},
            beforeSend:function (xhr) {
                //xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
            onSuccess:function (data, msg, xhr) {
                onsucc(that.handleRequest(data), msg, xhr);
            },
            onError:function (xhr, msg) {
                onerror(xhr, msg);
            }
        }).send();

    },

});

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


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker 
// ==========================================================================

var ScoreShaker  = ScoreShaker || {};

ScoreShaker.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage : 'shakeView',

    shakeView: ScoreShaker.ShakeView



});