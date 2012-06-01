// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: ScoreShaker
// Controller: CalculatorController
// ==========================================================================

ScoreShaker.CalculatorController = M.Controller.extend({

    calculateGame: function(rate1, rate2, rate3){
        var winResults = ['1:0', '2:1', '2:0', '2:1', '3:0', '3:1', '1:0', '3:2', '2:0', '2:1', '4:0', '1:0', '4:1', '4:2', '2:1', '4:3'];
        var looseResults = ['1:2', '0:1', '0:2', '1:2', '0:3', '1:3','0:1', '1:2', '2:3', '0:4', '1:4','0:1', '2:4', '1:2', '3:4'];
        var drawResults = ['0:0','2:2', '1:1', '2:2', '1:1', '3:3', '0:0', '4:4'];

        var factor = 10;

        var win = rate1*factor;
        var draw = rate2*factor;
        var loose = rate3*factor;

        var total = win + draw + loose;

        if (win < loose) {
            var temp = win;
            win = loose;
            loose = temp;
        }

        var results = [];

        for (var i = 0; i < win; i++) {
            results[i] = winResults;
        }

        for (var i = win; i < draw+win; i++) {
            results[i] = drawResults;
        }

        for (var i = win+draw; i < loose+win+draw; i++) {
            results[i] = looseResults;
        }

        _.shuffle(results);

        var rand1 = Math.floor(Math.random()*total);

        var result2 = results[rand1];

        var rand2 = Math.floor(Math.random()*result2.length);

        var endResultStr = result2[rand2];

        return endResultStr;
    }

});
