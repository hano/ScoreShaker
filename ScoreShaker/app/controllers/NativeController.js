// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: NativeController
// ==========================================================================

ScoreShaker.NativeController = M.Controller.extend({

    inNativeContainer: NO,

    shaked: function(){
        //ScoreShaker.AppController.shaked();
        $('#' + M.ViewManager.getView('shakeView', 'shakeBtn').id).trigger('tap');
        this.getCurrentGame();
        //window.location.href = 'playSound';
    },

    setNativeContainer: function(){
        this.inNativeContainer = true;
    },

    isInNativeContainer: function(){
        return this.inNativeContainer;
    },

    getCurrentGame: function(){
        var name = ScoreShaker.AppController.getGameName(ScoreShaker.AppController.currentGameId);
        var foreignGoals = ScoreShaker.AppController.foreignGoals;
        var homeGoals = ScoreShaker.AppController.homeGoals;
        var ret = name + ', ShakedScore: ' + homeGoals + ' : ' + foreignGoals;
        window.location.href = 'game/' + JSON.stringify(ret);
    }

});
