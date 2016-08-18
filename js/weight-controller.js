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

/*
controller.init = () => {

  // 初期設定
  dbManager.init().then(
    controller.renderWeightList
  ).catch(() => {
    // TODO
  });

  // イベント
  controller.$height.addEventListener('input', () => {
    if (appValidator.checkHeight(controller.$height)) {
      localStorage.setItem('height', controller.$height.value);
      controller.renderWeightList();
    }
  });

  document.getElementById('insertButton').addEventListener('click', () => {
    controller.clearinsertArea();

    const isValid = appValidator.checkDate(controller.$insertDate)
      & appValidator.checkWeight(controller.$insertWeight);
    if (isValid) {
      const date = moment(controller.$insertDate.value).format('YYYYMMDD');
      const weight = controller.$insertWeight.value;
      dbManager.insert(date, weight).then(insertStatus => {
        if (insertStatus === dbManager.DUPLICATE) {
          controller.$insertError.innerText = '指定の日の体重は登録済みです';
        } else {
          controller.renderWeightList();
        }
      }).catch(() => {
        // TODO
      });
    }
  });

  document.getElementById('cancelButton').addEventListener('click', () => {
    controller.clearUpdateArea();
    controller.setinsertMode();
  });

  document.getElementById('updateButton').addEventListener('click', () => {
    controller.clearUpdateArea();

    const isValid = appValidator.checkWeight(controller.$updateWeight);
    if (isValid) {
      const date = moment(controller.$updateDate.innerText.split('/').join('-')).format('YYYYMMDD');
      const weight = controller.$updateWeight.value;
      dbManager.update(date, weight).then(updateStatus => {
        if (updateStatus === dbManager.NOT_EXIST) {
          document.getElementById('updateError').innerText = '指定の日の体重は削除されています'
        } else {
          controller.renderWeightList();
        }
      }).catch(() => {
        // TODO
      });
    }
  });

  document.getElementById('deleteButton').addEventListener('click', () => {
    const date = moment(controller.$updateDate.innerText.split('/').join('-')).format('YYYYMMDD');
    dbManager.delete(date).then(
      // TODO
    ).catch(
      // TODO
    );
  });
};

controller.renderWeightList = () => {
  const promise = model.getWeightList();

  const $weighteTable = document.getElementById('weightTable');
  promise.then(weightList => {
    $weightTable.innerHTML = '';

    const height = localStorage.getItem('height');
    if (height == null) return;

    document.getElementById('height').value = height;

    let beforeWeight = 0;
    let diffWeight = 0;

    weightList.forEach(currentValue => {
      const weight = Number.parseFloat(currentValue.weight);
      const bmi = Number.parseFloat(weight / (height * height / 10000));
      diffWeight = Number.parseFloat(beforeWeight === 0 ? 0 : weight - beforeWeight);
      beforeWeight = weight;
      const $trEl = document.createElement('tr');
      $trEl.innerHTML = `
          <td>${currentValue.date}</td>
          <td class="number">${weight.toFixed(1)} kg</td>
          <td class="number">${diffWeight.toFixed(1)} kg</td>
          <td class="number">${bmi.toFixed(1)}</td>
          <td><button class="btn btn-mini btn-positive">変更・削除</button></td>`;
      $weightTable.appendChild($trEl);

      $trEl.getElementsByTagName('button')[0].addEventListener('click', () => {
        controller.setChangeMode(currentValue.date, weight);
      });
    });

    document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
  }).catch(() => {
    // TODO
  });

// TODO
  //「月別データ」
  var mydata = {
    labels: ['8/10', '8/11', '8/12', '8/13', '8/14', '8/15'],
    datasets: [{
      label: '体重',
      hoverBackgroundColor: "rgba(255,99,132,0.3)",
      data: [84, 83.2, 83.1, 83.5, 83.2, 82.1],
    }]
  };

//「オプション設定」
  var options = {
    title: {
//      display: true,
      //     text: 'サンプルチャート'
    }
  };

  var canvas = document.getElementById('weightGraph');
  var chart = new Chart(canvas, {

    type: 'line',  //グラフの種類
    data: mydata,  //表示するデータ
    options: options,  //オプション設定
    lineTension: 0
  });
};

controller.setinsertMode = () => {
  controller.$insertFieldset.removeAttribute('disabled');
  controller.$updateFieldset.setAttribute('disabled', 'disabled');

  controller.$updateDate.innerText = '';
  controller.$updateWeight.value = '';
};

controller.setChangeMode = (date, weight) => {
  controller.$insertFieldset.setAttribute('disabled', 'disabled');
  controller.$updateFieldset.removeAttribute('disabled');

  controller.$updateDate.innerText = date;
  controller.$updateWeight.value = weight.toFixed(1);
};

controller.clearinsertArea = () => {
  controller.$insertError.innerText = '';
};

controller.clearUpdateArea = () => {
  controller.$updateError.innerText = '';
};

*/
