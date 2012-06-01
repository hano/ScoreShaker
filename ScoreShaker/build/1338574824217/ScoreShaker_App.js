
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

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: CalculatorController
// ==========================================================================

ScoreShaker.CalculatorController = M.Controller.extend({

    calculateGame: function(){
        return '';
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
        window.location.href = 'playSound'
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

var BASE_URL = '/local_get_url';
var URL_URL = '/local_get_url';
URL_URL = 'http://10.21.1.127/~hano/ScoreShaker';
BASE_URL = 'http://10.21.1.127/~hano/ScoreShaker';
//BASE_URL = '/bwin';
//var BASE_EXTENDS = '?partnerid=iPhone%20Native%2030';

ScoreShaker.RemoteController = M.Controller.extend({

    awaitingResponses : 0,
    bwinURLs : '',
    gameDataPuffer : [],

    initialLoad: function(){
        //var events = this.validate(group_a);
        //return events;
        this.test();
    },

    test : function(){

        var that = this;
        this.getURLs(function(data){
            that.collect(data);
        });
    },

    getURLs : function(callback){
        var that = this;

        if(that.bwinURLs){
            callback(that.bwinURLs);
            return;
        }

        var succ = function(urlData){
            that.set('bwinURLs', urlData['urls']);
            callback(urlData['urls']);
        };

        var err = function(xhr, msg){
            that.err(xhr, msg);
        }

        this.send({
            url : URL_URL + '/urls.json'
        }, succ, err);
    },

    collect: function(urlData){

        var that = this;

        if(ScoreShaker.AppController.events){
            return ScoreShaker.AppController.events
        }

        var succ = function(data){
            that.sync(data);
        }
        var err = function(xhr, msg){
            that.err(xhr, msg);
        }
        Object.keys(urlData).forEach(function(ind){

            that.awaitingResponses += 1;
            that.send({
                url: BASE_URL + urlData[ind]
            }, succ, err);
        });

    },

    sync: function(data){

        var that = this;
        //console.log(that.awaitingResponses);
        that.awaitingResponses -= 1;

        that.gameDataPuffer.push.apply( that.gameDataPuffer, that.validate(data) );

        if(that.awaitingResponses <= 0){
            ScoreShaker.AppController.eventModel(that.gameDataPuffer);
        }

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
            url: obj.url ? obj.url : BASE_URL,
            method: obj.xhrmethod ? obj.xhrmethod : 'GET',
            isJSON:YES,
            data: {},
            beforeSend:function (xhr) {
                //xhr.setRequestHeader("X-Http-Method-Override", 'PUT');
            },
            onSuccess:function (data, msg, xhr) {
                onsucc(data, msg, xhr);
            },
            onError:function (xhr, msg) {
                onerror(xhr, msg);
            }
        }).send();

    },

    err : function(xhr, msg){
        console.log(xhr, msg);
    }

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
            cssClass: 'result',
            childViews:'winnerContainer stuffContainer looserContainer',
            winnerContainer:M.ContainerView.design({
                cssClass: 'winnerContainer',
                childViews: 'winner',
                winner:M.LabelView.design({
                    cssClass: 'winner',
                    value:'2',
                    contentBinding: ScoreShaker.AppController.winner
                })
            }),
            stuffContainer:M.ContainerView.design({
                childViews: 'stuff',
                cssClass: 'stuffContainer',
                stuff:M.LabelView.design({
                    cssClass: 'stuff',
                    value:':',
                    contentBinding: ScoreShaker.AppController.stuff
                })
            }),
            looserContainer:M.ContainerView.design({
                childViews: 'looser',
                cssClass: 'looserContainer',
                looser:M.LabelView.design({
                    value:'3',
                    cssClass: 'looser',
                    contentBinding: ScoreShaker.AppController.looser
                })
            })
        }),


        footer :M.ContainerView.design({
            childViews: 'tmp',
            cssClass: 'footer',
            events: {
                tap: {
                    //target: ScoreShaker.AppController,
                    action: function(){
                        window.open(M.I18N.l('tmpUrl'));
                    }
                }
            },
            tmp:M.LabelView.design({
                value: 'coded with The-M-Project',
                cssClass: 'imprint'
            })
        })
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