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
//BASE_URL = '/bwin';
//var BASE_EXTENDS = '?partnerid=iPhone%20Native%2030';

ScoreShaker.RemoteController = M.Controller.extend({

    awaitingResponses : 0,
    bwinURLs : '',
    gameDataPuffer : [],

    initialLoad: function(){
        //var events = this.validate(group_a);
        //return events;
        //this.test();
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
