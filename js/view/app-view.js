'use strict';

const View = require('../view/view.js');

class AppView extends View {
  constructor(appController, appModel, inputHeightModel, insertWeightModel, updateWeightModel, weightListModel) {
    super();
    this._appController = appController;
    this._appModel = appModel;
    this._inputHeightModel = inputHeightModel;
    this._insertWeightModel = insertWeightModel;
    this._updateWeightModel = updateWeightModel;
    this._weightListModel = weightListModel;

    this._setEl({
      'mainButton': '_$mainButton',
      'graphButton': '_$graphButton',
      'mainContainer': '_$mainContainer',
      'graphContainer': '_$graphContainer',
      'insertFieldset': '_$insertFieldset',
      'updateFieldset': '_$updateFieldset'
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
    this._setAppEvent(this._updateWeightModel, {
      'update': this._change
    });
    this._setAppEvent(this._updateWeightModel, {
      'remove': this._change
    });
    this._setAppEvent(this._weightListModel, {
      'changeUpdateMode': this._changeUpdateMode
    });
    this._setAppEvent(this._updateWeightModel, {
      'dispUpdateMode': this._dispUpdateMode
    });
    this._setAppEvent(this._updateWeightModel, {
      'changeInsertMode': this._changeInsertMode
    });
  }

  _change() {
    this._appController.readAll();
  }

  _changeUpdateMode(param) {
    this._$insertFieldset.classList.add('hide');
    this._$updateFieldset.classList.remove('hide');

    this._appController.changeUpdateMode(param);
  }

  _changeInsertMode(param) {
    this._$insertFieldset.classList.remove('hide');
    this._$updateFieldset.classList.add('hide');
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
}

module.exports = AppView;
