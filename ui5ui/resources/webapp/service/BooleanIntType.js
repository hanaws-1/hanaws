sap.ui.define([
  'sap/ui/model/SimpleType'
], function (SimpleType) {
  'use strict';
  return SimpleType.extend('ui5ui.service.BooleanIntType', {
    formatValue: function (intValue) {
      return intValue === 1;
    },
    parseValue: function (boolValue) {
      return boolValue ? 1 : 0;
    },
    validateValue: function () {
    }
  });
});