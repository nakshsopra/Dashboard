sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.Home", {

        onFamily: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("family");
        },

        onRole: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("role");
        },

        onCompetencies: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("competencies");
        }

    });
});