sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController',
    'sap/m/MessageToast'
], function (BaseController, MessageToast) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.Role", {
        onBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        },

        onSelectItem: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            //var sIndex = sPath.replace(/\D/g, '');
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.onGoTo(sIndex);
        },

        onGoTo: function (sIndex) {

            //Get the object of router
            var oRouter = this.getOwnerComponent().getRouter();

                //ask router to navigate
            oRouter.navTo("roleDetails", {
                roleID: sIndex
            });
        },

        onCompare: function (oEvent) {

            var oTable = this.byId("idList");
            var iIndex = oTable.getSelectedItems();
            var sMsg;
            if (iIndex.length < 2) {
                sMsg = "Kindly select at least 2 items";
                MessageToast.show(sMsg);
            } else if (iIndex.length > 3) {
                sMsg = "Kindly select maximum 3 items";
                MessageToast.show(sMsg);
            }
            else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("compare");
            }
        }
    });
});