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
//            SRMDummy.PageController.switchToPage(prev);
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
