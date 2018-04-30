sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ui5ui/service/AppointmentService",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, AppointmentService, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("ui5ui.controller.appointment.Overview", {
		onInit: function () {
			var viewModel;
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("appointment").attachPatternMatched(this._onRouteMatched, this);
			viewModel = new JSONModel ({
				busy: false,
				hasUiChanges: false
			});
			this.getView().setModel(viewModel, 'localModel');
		},
		_onRouteMatched: function (event) {
			var that = this;
			var path = event.getParameter('arguments').runnerPath;
			var view = this.getView();
			view.bindElement({
				model: 'db',
				path: '/' + path
			});
			var context = view.getBindingContext('db');
			context.requestProperty('id').then(function(id) {
				that._setFilter(id);
			});
		},
		
		_setFilter: function(runnerId) {
			
		},
		
		_setUiChanges: function(hasUiChanges) {
			if (hasUiChanges === undefined) {
				hasUiChanges = this.getView().getModel('db') && this.getView().getModel('db').hasPendingChanges();
			}	
			var localModel = this.getView().getModel('localModel');
			if (localModel) {
				localModel.setProperty('/hasUiChanges', hasUiChanges);
			}
		},
		
		onPressAppointment: function(event) {
			var that = this;
	    	var selectedAppointmentCtx = event.getSource().getBindingContext('db');
	    	selectedAppointmentCtx.requestProperty('id').then(function(id) {
			    that._navigateToAppointment(id) ;	
	    	});
		},
		onPressCreate: function() {
		    var router = sap.ui.core.UIComponent.getRouterFor(this);
		    var runnerPath = this.getView().getBindingContext('db').getPath().substring(1);
		    router.navTo('createAppointment', {
		        runnerPath: runnerPath
		    });
		},
		_navigateToAppointment: function (appointmentId) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("editAppointment", {
				appointmentId: appointmentId
			});
		},
		formatSuccessState: function (intValue) {
		    return (intValue === 1) ? 'Success' : 'Error';
		},
		formatSuccessText: function (intValue) {
		    return (intValue === 1) ? 'Successful' : 'Not yet successful';
		}
	});
});