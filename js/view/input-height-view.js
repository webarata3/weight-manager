'use strict';

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class InputHeightView extends View{
  constructor(inputHeightController, inputHeightModel) {
    super();
    this._inputHeightController = inputHeightController;
    this._inputHeightModel = inputHeightModel;

    this._setEl({
      'height': '_$height'
    });

    this._setEvent({
      'input height': this._onInputHeight
    });

    this._setAppEvent(this._inputHeightModel, {
      'change': this._change,
      'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._inputHeightController.init();
  }

  _onInputHeight() {
    this._inputHeightController.changeHeight(this._$height.value);
  }

  _change() {
    DomUtil._removeFieldError(this._$height);
    this._render();
  }

  _render() {
    this._$height.value = this._inputHeightModel.get('height');
  }

  _invalid(errorMessage) {
    DomUtil._setFieldError(this._$height, errorMessage);
  }
};
