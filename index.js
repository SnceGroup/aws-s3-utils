const getAccessData = (function () {
  const helper = require('./modules/_sw3-helper');
  return helper.getAccessData();
}())

const getBrand = (function () {
  const helper = require('./modules/_sw3-helper');
  return helper.getAccessData().BRAND;
}())

module.exports = { getAccessData, getBrand }