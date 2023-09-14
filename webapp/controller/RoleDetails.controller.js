sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.RoleDetails", {
        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("roleDetails").attachMatched(this.showDetail, this);
        },
        
        showDetail: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").roleID;
            var sPath = '/' + sIndex;
            this.getView().bindElement({
                path: sPath,
                parameters: {expand: 'roleSkillMappings'}
            });
        },

        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        }
    });
});