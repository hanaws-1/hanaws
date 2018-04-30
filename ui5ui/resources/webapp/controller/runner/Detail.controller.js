sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("ui5ui.controller.runner.Detail", {
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (event) {
			var path = event.getParameter('arguments').runnerPath;
			this.getView().bindElement({
				model: 'db',
				path: '/' + path
			});				
		},
		formatRunnerDetailTitle: function(name, gender) {
			var runnerTitle = 'Läufer/in';
			if (gender === 'M') {
				runnerTitle = 'Läufer';
			} else if (gender === 'W') {
				runnerTitle = 'Läuferin'
			}
			return runnerTitle + ' ' + name;
		},
		onAppointmentClicked: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("appointment", {
				runnerPath: this.getView().getBindingContext("db").getPath().substring(1) // cut off the leading '/' which is not legal in a route parameter
			});
		}
	});
});