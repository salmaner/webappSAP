sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function(Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";

    return Controller.extend("main.namespace.controller.App",  {
        /* - - - - - - - - - - - - - - - - - -- - - - - - - - -
         *           On init area
         * - - - - - - - - - - - - - - - - - -- - - - - - - - -*/
        onInit: function() {
            // set data model on view
            var oData = {
                recipient: {
                    name: "World",
                    discribe: "World, ты так Прекрасен!",
                    addition: "Моё дополнительное послание миру!"+
                    " I love you my lively Univers!"
                }
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            // set i18n model on view создаем модель связи (бандэл) для имён
            var i18nModel = new ResourceModel({
                // будь аккуратен со связями тут путь очень важен до твоих объектов.
                bundleName: "main.namespace.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        /* - - - - - - - - - - - - - - - - - -- - - - - - - - -
         *          event functions
         * сначало три кнопки, события которых вызывают сообщения
         * - - - - - - - - - - - - - - - - - -- - - - - - - - -*/
        onShowHello: function() {
            // read msg (helloMsg) from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            /* сообщение от класса MessageToast */
            MessageToast.show(sMsg);
        },

        onShowHelloFull: function() {
            // read msg (helloFull) from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/discribe");
            var sMsg = oBundle.getText("helloFull", [sRecipient]);
            /* сообщение от класса MessageToast */
            MessageToast.show(sMsg);
        },

        noShowAdd: function() {
          // read msg (helloAdd) from i18n model
          var oBundle = this.getView().getModel("i18n").getResourceBundle();
          var sRecipient = this.getView().getModel().getProperty("/recipient/addition");
          var sMsg = oBundle.getText("helloAdd", [sRecipient]);
          /* сообщение от класса MessageToast*/
          MessageToast.show(sMsg);
        }


    });
    // end of return Controller -------------------------------



});


// "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --profile-directory=Default --app-id=ofhbbkphhbklhfoeikjpcbhemlocgigb
