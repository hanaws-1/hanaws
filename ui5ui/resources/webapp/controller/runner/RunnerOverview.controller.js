sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5ui.controller.runner.RunnerOverview", {
		formatGenderIconURI: function(genderValue) {
			if (genderValue === 'M') {
				return 'sap-icon://customer';
			} else if (genderValue === 'W') {
				return 'sap-icon://physical-activity';
			} else {
				return 'sap-icon://sys-help';
			}
		},
		
		onPressRunner: function(event) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("detail", {
				runnerPath: event.getSource().getBindingContext("db").getPath().substring(1) // cut off the leading '/' which is not legal in a route parameter
			});
		}
	});
});