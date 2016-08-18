'use strict';

class Controller {
  constructor(model) {
    this._model = model;
  }

  renderWeightList() {
    this._model.readAllWeightList();
  }

  inputHeight(height) {
    this._model.inputHeight(height)
  }

  insertWeight(date, weight) {
    this._model.insertWeight(date, weight);
  }

  changeUpdateMode(date, weight) {
    this._model.changeUpdateMode(date, weight);
  }

  changeInsertMode() {
    this._model.changeInsertMode();
  }

  deleteWeight() {
    this._model.deleteWeight();
  }

  updateWeight(weight) {
    this._model.updateWeight2(weight);
  }
}

module.exports = Controller;
