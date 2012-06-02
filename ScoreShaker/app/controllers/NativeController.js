// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: NativeController
// ==========================================================================

ScoreShaker.NativeController = M.Controller.extend({

    shaked: function(){
        window.location.href = 'playSound';
        this.changeBgColor('.ui-content');
    },

    changeBgColor: function(ident){
        $(ident).css('background', 'rgba(255, 255, 255, 0.5)');
    }

});
