sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("ui5ui.controller.appointment.Overview", {
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("appointment").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (event) {
			var path = event.getParameter('arguments').runnerPath;
			this.getView().bindElement({
				model: 'db',
				path: '/' + path
			});				
		},
		onPressAppointment: function(event) {
		    var selectedAppointmentId = event.getSource().getBindingContext('db').getObject().id; 
		    this._navigateToAppointment(selectedAppointmentId);
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