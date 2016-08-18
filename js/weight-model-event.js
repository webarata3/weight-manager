'use strict';

const ModelEvent = {
  FINISH_INIT: 'finishInit',
  FINISH_READ_ALL: 'finishReadAll',
  CHANGE_HEIGHT: 'changeHeight',
  FINISH_INSERT: 'finishInsert',
  FINISH_DELETE: 'finishDelete',
  FINISH_UPDATE: 'finishUpdate',

  CHANGE_INSERT_MODE: 'changeInsertMode',
  CHANGE_UPDATE_MODE: 'changeUpdateMode'
};

module.exports = ModelEvent;
