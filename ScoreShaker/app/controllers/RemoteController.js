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
