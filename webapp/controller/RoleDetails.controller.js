sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController',
    "sap/ui/model/odata/ODataModel",
    "sap/ui/model/json/JSONModel"
], function(BaseController, ODataModel, JSONModel) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.RoleDetails", {
        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("roleDetails").attachMatched(this.showDetail, this);

            // Define the binding path to the array of items in the JSON model
            /* oTable.bindItems({
                path: "jsonModel>/RoleEntity",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{jsonModel>externalCode}" }),
                        new sap.m.Text({ text: "{jsonModel>name_en_GB}" })
                    ]
                })
            }); */
        },
        
        showDetail: function(oEvent){
            // Get a reference to the table control
            /* var oTable = this.getView().byId("myTable");

            // Get a reference to the JSON model
            var oJSONModel = this.getView().getModel("jsonModel");

            // Bind the table to the JSON model
           // oTable.setModel(oJSONModel);

            var sIndex = oEvent.getParameter("arguments").roleID;
            var sPath = '/' + sIndex;
            this.getView().bindElement({
                path: sPath,
                parameters: {expand: 'roleCompetencyMappings'}
            }); */
        },

        onBack: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        }
    });
});