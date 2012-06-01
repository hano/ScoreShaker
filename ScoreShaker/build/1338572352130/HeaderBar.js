m_require('ui/toolbar.js');

M.HeaderBar = M.ToolbarView.extend({

    type: 'M.HeaderBar'
});

M.HeaderBar.design = function(obj){


    var backButton = {};
    var leftChildViews = '';
    if(obj && obj.backButton === false){

    }else{
        leftChildViews = 'backBtn';
        backButton = M.ButtonView.design({
            value:M.I18N.l('back'),
            events: {
                tap: {
                    //target:ScoreShaker.PageController,
                    //action: 'goBack'
                }
            }
        });
    }

    var HeaderBar = {

        childViews: 'left label right',

        left:M.ContainerView.design({
            childViews: leftChildViews,
            anchorLocation: M.LEFT,

            backBtn: backButton
        }),

        label: M.LabelView.design({
            anchorLocation: M.CENTER,
            value:'',
            contentBinding: {
                target: ScoreShaker.AppController,
                property: 'headerTitle'
            }
        }),

        right:M.ContainerView.design({
            childViews: 'logoutBtn',
            anchorLocation: M.RIGHT,
            logoutBtn: M.ButtonView.design({
                value: '',
                isIconOnly: YES,
                icon: 'info',
                events: {
                    tap: {
                        //target:ScoreShaker.LoginController,
                        //action: 'logout'
                    }
                }
            })
        })
    };

    return M.ToolbarView.design(HeaderBar);
}