'use strict';

module.exports = class HeightDao {
  static getHeight() {
    return localStorage.getItem('height') || '';
  }

  static setHeight(height) {
    localStorage.setItem('height', height);
  }
};
