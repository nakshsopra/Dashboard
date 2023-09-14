sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.Compare", {
        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("role");
        }
    });
});