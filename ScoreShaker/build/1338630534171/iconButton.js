m_require('ui/button.js');

M.IconButtonView = M.ButtonView.extend({

    type:'M.IconButtonView',

    render: function(){
        this.computeValue();
        console.log(this.id, this.value);

        console.log(M.IconButtonView.apply(M.ButtonView.render));

        return M.ButtonView.render();
    }

});