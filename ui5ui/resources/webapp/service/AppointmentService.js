sap.ui.define([
], function() {
	"use strict";

	var PROPERTIES = ['id', 'runner.id', 'time', 'comment', 'success'];

	function _readByKeys(oDataModel, entityName, keyMap, urlParams) {
		return new Promise(function(resolve, reject) {
			oDataModel.metadataLoaded().then(function() {
				var path = '/' + oDataModel.createKey(entityName, keyMap);
				oDataModel.read(path, {
					success: function(data) {
						resolve(data);
					},
					error: function(error) {
						reject(error);
					},
					urlParameters: urlParams
				});
			});
		});
	}

	function _update(oDataModel, appointmentId, data) {
		return new Promise(function(resolve, reject) {
			return oDataModel.metadataLoaded().then(function() {
				var path = '/' + oDataModel.createKey('Appointment', {
					id: appointmentId
				});
				PROPERTIES.forEach(function(property) {
					oDataModel.setProperty(path + '/' + property, data[property]);
				});
				oDataModel.attachRequestCompleted(function(event) {
					if (event.getParameters().success) {
						resolve();
					} else {
						reject();
					}
				});
				oDataModel.submitChanges();
			});
		});
	}

	function _create(oDataModel, data) {
		return new Promise(function(resolve, reject) {
    	    function _oneShot(event) {
				var response = event.getParameter(response);
				if (event.getParameters().success) {
					resolve(response);
				} else {
					reject(response);
				}
    	    }
			oDataModel.create('/Appointment', {
			    properties: data
		    });
			oDataModel.attachRequestCompleted(function(event) {
			    _oneShot(event);
			    oDataModel.detachRequestCompleted(_oneShot);
			});
			oDataModel.submitChanges();
		});
	}

	return {
		loadAppointment: function(oDataModel, appointmentId) {
			return _readByKeys(oDataModel, 'Appointment', {
				id: appointmentId
			}, {
				'$expand': 'Runner'
			});
		},
		saveAppointment: function(oDataModel, appointmentId, data) {
			if (appointmentId === undefined || appointmentId === null || appointmentId === -1) {
				return _create(oDataModel, data);
			} else {
				return _update(oDataModel, appointmentId, data);
			}
		},
		createNewAppointment: function(oDataModel, runnerPath) {
      var runnerContextBinding = oDataModel.bindContext(runnerPath);
			return new Promise(function (resolve, reject) {
        runnerContextBinding.attachChange(function (changeEvent) {
        	resolve(runnerContextBinding);
        });
        runnerContextBinding.initialize();
      }).then(function (initializedRunnerBinding) {
      	return initializedRunnerBinding.getContext().requestProperty('/id');
      }).then(function (runnerId) {
        var appointmentsPath = runnerPath + '/' + 'appointments';
        var listBinding = oDataModel.bindList(appointmentsPath);
        runnerContextBinding.destroy();
        return listBinding.create({
          "Runner": {
            name: runnerName
          },
          "runnerId": runnerId,
          "time": new Date(),
          comment: 'New comment',
          success: 0
        });
      });
		}
	};
});