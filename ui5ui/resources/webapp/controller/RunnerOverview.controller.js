sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5ui.controller.RunnerOverview", {
		formatGenderIconURI: function(genderValue) {
			if (genderValue === 'M') {
				return 'sap-icon://customer';
			} else if (genderValue === 'W') {
				return 'sap-icon://physical-activity';
			} else {
				return 'sap-icon://sys-help';
			}
		}
	});
});