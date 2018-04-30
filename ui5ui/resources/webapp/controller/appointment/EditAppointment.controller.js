sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"ui5ui/service/AppointmentService",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"ui5ui/service/BooleanIntType"  // no alias, just has to be there to serve the xml view
], function(Controller, History, AppointmentService, JSONModel, MessageToast) { 
	"use strict";
	return Controller.extend("ui5ui.controller.appointment.EditAppointment", {
		onInit: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute('editAppointment').attachPatternMatched(this._onRouteMatched, this);
			router.getRoute('createAppointment').attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(event) {
		    var args = event.getParameter('arguments');
			var appointmentId = args.appointmentId;
			var runnerPath = args.runnerPath;
			var view = this.getView();
			var localModel = new JSONModel();
			view.setModel(localModel, 'local');
			if (!appointmentId && !!runnerPath) {
			    AppointmentService.createNewAppointment(view.getModel('db'), runnerPath).then(function(data) {
			        localModel.setData(data);
			    }); 
			} else {
			    AppointmentService.loadAppointment(view.getModel('db'), appointmentId).then(function(data) {
			        localModel.setData(data);
				    localModel.setProperty('/appointmentId', appointmentId);
    			}).catch(function(error) {
	    			jQuery.sap.log.error(error);
		    	});
			}
		},

		onPressAppointment: function(event) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("editAppointment", {
				appointmentCtx: event.getSource().getBindingContext("db") // cut off the leading '/' which is not legal in a route parameter
			});
		},
		
		_navigateBack: function() {
			var history = History.getInstance();
			var previousHash = history.getPreviousHash();

			if (previousHash !== undefined) {
				window.history.go(-1);
			} else {
				var router = sap.ui.core.UIComponent.getRouterFor(this);
				router.navTo("overview", true);
			}
		},
		
		onPressCancel: function() {
			this._navigateBack();
		},
		
		onPressSave: function() {
		    var view = this.getView();
		    var localModel = view.getModel('local');
		    var id = localModel.getProperty('/appointmentId');
		    var localData = localModel.getData();
		    var that = this;
		    AppointmentService.saveAppointment(view.getModel('db'), id, localData).then(function() {
		       that._navigateBack(); 
		    }).catch(function(error) {
		        MessageToast.show('Error :"' + JSON.stringify(error) + '"');
		    });
		},
		
		formatSuccessVisibility: function(appointmentId) {
		    if (!appointmentId) {
		        return false;
		    }
		    if (parseInt(appointmentId, 10) === -1) {
		        return false;
		    }
		    return true;
		}
	});
});