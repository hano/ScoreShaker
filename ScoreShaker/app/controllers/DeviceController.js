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

        if(!ScoreShaker.NativeController.isInNativeContainer()){
            this.showShakeViews();

        }
        if(typeof window.DeviceMotionEvent != 'undefined'){

            if(this.plattform === 'iPad'){
                this.showShakeViews();
            }

            $(document).bind('shaked', function(){
                ScoreShaker.AppController.shaked();
            });
        }
    },

    showShakeViews: function(){
        $('#' + M.ViewManager.getView('shakeView', 'shakeBtn').id).removeClass('hideNativeElements');
    }

});
