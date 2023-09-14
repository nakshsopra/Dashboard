sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.FamilyDetails", {
        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("familyDetails").attachMatched(this.showDetail, this);
        },
        
        showDetail: function(oEvent){
            var sIndex = oEvent.getParameter("arguments").familyID;
            var sPath = '/' + sIndex;
            this.getView().bindElement(sPath);
        },

        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        }
    });
});