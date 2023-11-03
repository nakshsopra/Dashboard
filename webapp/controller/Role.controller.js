sap.ui.define([
    'com/ss/jpb/rp/controller/BaseController',
    "sap/ui/model/odata/ODataModel",
    "sap/ui/model/json/JSONModel"
], function (BaseController, ODataModel, JSONModel) {
    'use strict';
    return BaseController.extend("com.ss.jpb.rp.controller.Role", {

        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("role").attachMatched(this.afterLoading, this);
            /* var oODataModel = new ODataModel("/odata/v2/", true);
           oODataModel.read("/RoleEntity", {
               success: function (oData) {
                   // Data has been successfully loaded from the OData service
                   // oData will contain the fetched data
                   var oJSONModel = new JSONModel(oData);

                   // Set the JSON model to the view
                   sap.ui.getCore().setModel(oJSONModel, "jsonModel");
               }.bind(this),
               error: function (oError) {
                   // Handle error
               }
           });  */

        },

        afterLoading: function () {
            var oStructure = {
                "jobCodes": [

                ],
                "jobCompetencies": [

                ],
                "jobDescription": [

                ]
            }
            this.getView().getModel("roles").setData(oStructure);
        },

        onBack: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home");
        },

        onSelectItem: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            var sIndex = sPath.replace(/\D/g, '');
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            var bSelected = oEvent.getParameter("selected");
            if (bSelected) {
                this.fetchJobCode(sIndex);
                this.fetchJobCompetencies(sIndex);
                this.fetchJobDescription(sIndex);
            } else {
                this.removeJobCode(sIndex);
                this.removeJobCompetency(sIndex);
                this.removeJobDescription(sIndex);
            }
            this.onGoTo(sIndex);
        },

        removeJobCode: function (sIndex) {
            var oRoleModel = this.getView().getModel("roles");
            var oArray = oRoleModel.getProperty("/jobCodes");
            var sIndex = sIndex.replace(/\D/g, '');
            for (var i = 0; i < oArray.length; i++) {
                if (sIndex == oArray[i].externalCode) {
                    oArray.splice(i, 1); // deletes one element from i to 1
                    i--;
                }
            }
            oRoleModel.refresh();
        },

        removeJobCompetency: function (sIndex) {
            var oRoleModel = this.getView().getModel("roles");
            var oArray = oRoleModel.getProperty("/jobCompetencies");
            var sIndex = sIndex.replace(/\D/g, '');
            for (var i = 0; i < oArray.length; i++) {
                if (sIndex == oArray[i].externalCode) {
                    oArray.splice(i, 1); // deletes one element from i to 1
                    i--;
                }
            }
            oRoleModel.refresh();
        },

        removeJobDescription: function(sIndex){
            let oRoleModel = this.getView().getModel("roles");
            let oArray = oRoleModel.getProperty("/jobDescription");
            var sIndex = sIndex.replace(/\D/g, '');
            for(let i=0; i<oArray.length;i++){
                if(sIndex == oArray[i].role){
                    oArray.splice(i,1);
                    i--;
                }
            }
            oRoleModel.refresh();
        },

        fetchJobDescription: function (sIndex) {

            var sIndex = sIndex.replace(/\D/g, '');
            var oFilter = new sap.ui.model.Filter("role", sap.ui.model.FilterOperator.EQ, sIndex);
            var url = "/JobProfile";
            var oModel = this.getView().getModel();

            oModel.read(url, {
                filters: [oFilter],
                urlParameters: {
                    "$expand": "longDesciptions, shortDesciptions",
                    "$select": "role, externalCode, name_localized, longDesciptions/desc_localized, shortDesciptions/desc_localized"
                },

                success: function (oRoleDescription) {

                    // due to asy call this will not refer the current object
                    var oRoleModel = this.getView().getModel("roles");
                    //var oArray = [];// this will replace the current value so we need to use getProperty
                    var oArray = oRoleModel.getProperty("/jobDescription");
                    //for (var i = 0; i < oJobCode.jobCodeMappings.results.length; i++) {
                    var tmp = {
                        "externalCode": oRoleDescription.results[0].externalCode,
                        "name": oRoleDescription.results[0].name_localized,
                        "role": oRoleDescription.results[0].role,
                        "roleshortDescription": oRoleDescription.results[0].shortDesciptions.results[0].desc_localized,
                        "rolelongDescription": oRoleDescription.results[0].longDesciptions.results[0].desc_localized,

                    }

                    oArray.push(tmp);
                    // }
                    oRoleModel.setProperty("/jobDescription", oArray);
                }.bind(this), // this will pass the refernce of previous "this" 
                error: function (oerror) {

                }
            })
        },

        fetchJobCode: function (sIndex) {
            var url = "/" + sIndex;
            var oModel = this.getView().getModel();

            oModel.read(url, {
                urlParameters: {
                    "$expand": "jobCodeMappings",
                    "$select": "jobCodeMappings/jobCode, name_localized, externalCode"
                },

                success: function (oJobCode) {

                    // due to asy call this will not refer the current object
                    var oRoleModel = this.getView().getModel("roles");
                    //var oArray = [];// this will replace the current value so we need to use getProperty
                    var oArray = oRoleModel.getProperty("/jobCodes");
                    //for (var i = 0; i < oJobCode.jobCodeMappings.results.length; i++) {
                    var tmp = {
                        "externalCode": oJobCode.externalCode,
                        "name": oJobCode.name_localized,
                        "jobCodeMap": oJobCode.jobCodeMappings.results
                    }

                    oArray.push(tmp);
                    // }
                    oRoleModel.setProperty("/jobCodes", oArray);
                }.bind(this), // this will pass the refernce of previous "this" 
                error: function (oerror) {

                }
            })
        },

        fetchJobCompetencies: function (sIndex) {
            var url = "/" + sIndex;
            var oModel = this.getView().getModel();
            oModel.read(url, {
                urlParameters: {
                    "$expand": "roleCompetencyMappings/competencyNav",
                    "$select": "roleCompetencyMappings/competencyNav/name_localized, name_localized, externalCode"
                },

                success: function (oJobCompetency) {
                    // due to asy call this will not refer the current object
                    var oRoleModel = this.getView().getModel("roles");
                    //var oArray = [];// this will replace the current value so we need to use getProperty
                    var oArray = oRoleModel.getProperty("/jobCompetencies");
                    //for (var i = 0; i < oJobCompetency.roleCompetencyMappings.results.length; i++) {
                    var tmp = {
                        "externalCode": oJobCompetency.externalCode,
                        "name": oJobCompetency.name_localized,
                        // "jobCompetency": oJobCompetency.roleCompetencyMappings.results[i].competencyNav.name_localized
                        "jobCompetencyMap": oJobCompetency.roleCompetencyMappings.results
                    }
                    oArray.push(tmp);
                    // }                  
                    oRoleModel.setProperty("/jobCompetencies", oArray);
                }.bind(this), // this will pass the refernce of previous "this" 
                error: function (oerror) {

                }
            })
        },

        onGoTo: function (sIndex) {

            //Get the object of router
            var oRouter = this.getOwnerComponent().getRouter();

            //ask router to navigate
            oRouter.navTo("roleDetails", {
                roleID: sIndex
            });
        },
    });
});