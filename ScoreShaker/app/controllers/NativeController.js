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
        window.location.href = 'playSound';
        ScoreShaker.AppController.shaked();
    },

    setNativeContainer: function(){
        this.inNativeContainer = true;
    },

    isInNativeContainer: function(){
        return this.inNativeContainer;
    }

});
