
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: test
// Controller: NativeController
// ==========================================================================

ScoreShaker.NativeController = M.Controller.extend({

    a: '',

    shaked: function(){
		//test 1
		//this.set('a', 'danke fürs schütteln');
        //alert(this.a);   		
		//test 2
		ScoreShaker.NativeController.set('a', 'danke fürs schütteln');
        alert(ScoreShaker.NativeController.a);
    }

});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: test 
// ==========================================================================

var ScoreShaker = ScoreShaker || {};

ScoreShaker.app = M.Application.design({

    /* Define the entry/start page of your app. This property must be provided! */
    entryPage:'page1',

    page1:M.PageView.design({

        childViews:'a b',

        a:M.LabelView.design({
            value:'bitte schütteln',
            contentBinding:{
                target:ScoreShaker.NativeController,
                property:'a'
            }

        }),
        b:M.ButtonView.design({
            value: 'shake',
            events:{
                tap:{
                    target: ScoreShaker.NativeController,
                    action: 'shaked'
                }
            }
        })
    })

});