'use strict';

class View {
  constructor(controller, model) {
    this._controller = controller;
    this.model = model;
  }
}

module.exports = View;
