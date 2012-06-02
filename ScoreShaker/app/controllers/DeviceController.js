// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: DeviceController
// ==========================================================================

ScoreShaker.DeviceController = M.Controller.extend({

    plattform : '',

    init: function(isFirstLoad) {
//        if(isFirstLoad) {
//
//        }

        this.plattform = M.Environment.getPlatform();

        if(ScoreShaker.NativeController.isInNativeContainer()){
            this.hideShakeViews();
        }

        if(typeof window.DeviceMotionEvent != 'undefined'){
            this.hideShakeViews();
            $(document).bind('shaked', function(){
                console.log('shaked');
                ScoreShaker.AppController.shaked();
            });
        }
    },

    hideShakeViews: function(){
        $('#' + M.ViewManager.getView('shakeView', 'shakeBtn').id).hide();
    }

});
