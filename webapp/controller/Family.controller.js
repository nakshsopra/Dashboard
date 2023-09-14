sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.Family", {
        
        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        },
        onSelectItem: function(oEvent){
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            //var sIndex = sPath.replace(/\D/g, '');
            var sIndex = sPath.split("/")[sPath.split("/").length - 1 ];
            this.onGoTo(sIndex);
        },

        onGoTo: function(sIndex){

            //Get the object of router
            var oRouter = this.getOwnerComponent().getRouter();

            //ask router to navigate
            oRouter.navTo("familyDetails",{
                familyID: sIndex
            });
        },
    });
});