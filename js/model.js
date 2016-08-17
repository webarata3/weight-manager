'use strict';

const dbManager = require('../js/db-manager.js');

const model = {};

module.exports = model;

model.getWeightList = () => {
  return dbManager.readAll()
};
