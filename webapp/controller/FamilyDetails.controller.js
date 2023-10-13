sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController'
], function (BaseController) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.FamilyDetails", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("familyDetails").attachMatched(this.showDetail, this);
        },

        showDetail: function (oEvent) {
            let orolesdata;
            var sIndex = oEvent.getParameter("arguments").familyID;
            var sPath = '/' + sIndex;
            this.getView().bindElement(sPath);
            var id = sPath.replace(/\D/g, '');
            var oroleTable = this.getView().byId("familyTable");
            var url = "/RoleEntity";
            var template = this.getView().byId("_IDGenColumnListItem1");
            this.getView().getModel().read(url, {
                success: function (odata, oresponse) {
                    orolesdata = odata;
                }
            })
            oroleTable.bindItems({
                path: url,
                templateShareable: false,
                template: template.clone(),
                filters: [
                    new sap.ui.model.Filter({
                        path: 'family',
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: id
                    })
                ]
            });
            debugger;
        },

        onBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        }
    });
});