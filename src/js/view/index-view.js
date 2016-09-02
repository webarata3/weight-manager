'use strict';

const View = require('../view/view');

module.exports = class IndexView extends View {
  constructor(indexController, indexModel, inputHeightModel, insertWeightModel, weightListModel) {
    super();
    this._indexController = indexController;
    this._indexModel = indexModel;
    this._inputHeightModel = inputHeightModel;
    this._insertWeightModel = insertWeightModel;
    this._weightListModel = weightListModel;

    this._setEl({
      'mainButton': '_$mainButton',
      'graphButton': '_$graphButton',
      'mainContainer': '_$mainContainer',
      'graphContainer': '_$graphContainer',
      'insertFieldset': '_$insertFieldset'
    });

    this._setEvent({
      'click mainButton': this._onClickMainButton,
      'click graphButton': this._onClickGraphButton
    });

    this._setAppEvent(this._inputHeightModel, {
      'change': this._change
    });
    this._setAppEvent(this._insertWeightModel, {
      'insert': this._change
    });
    this._setAppEvent(this._weightListModel, {
      'changeUpdateMode': this._changeUpdateMode
    });
  }

  _change() {
    this._indexController.readAll();
  }

  _onClickMainButton() {
    this._$mainButton.classList.add('active');
    this._$graphButton.classList.remove('active');
    this._$mainContainer.classList.remove('hide');
    this._$graphContainer.classList.add('hide');
  }

  _onClickGraphButton() {
    this._$mainButton.classList.remove('active');
    this._$graphButton.classList.add('active');
    this._$mainContainer.classList.add('hide');
    this._$graphContainer.classList.remove('hide');
  }
};
