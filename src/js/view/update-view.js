'use strict';

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class UpdateView extends View{
  constructor(updateController, updateModel) {
    super();
    this._updateController = updateController;
    this._updateModel = updateModel;

    this._setEl({
//      'height': '_$height'
    });

    this._setEvent({
//      'input height': this._onInputHeight
    });

    this._setAppEvent(this._inputHeightModel, {
//      'change': this._change,
 //     'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._updateController.init();
  }
};
