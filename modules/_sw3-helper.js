var helper = require('../helper')
require('dotenv').config()
const currentBranch = helper.getCurrentBranch()
const PROFILE = 'sandwatch-frontend'

var checkFolder = function () {
  const manifest = helper.getExecCommandOutput('cat MANIFEST').trim()
  if (manifest === 'local') {
    return false
  }
  return currentBranch === 'master' ||
    currentBranch === 'prod' ||
    currentBranch === 'pre' ||
    currentBranch === 'staging' ||
    currentBranch === 'dev'
}

const getAccessData = function () {
  const { BRAND } = process.env
  const { BUCKET } = process.env
  if (!checkFolder()) {
    const { BUCKETLOCAL, KEYLOCAL, SECRETLOCAL } = process.env
    return { BUCKET: BUCKETLOCAL, KEY: KEYLOCAL, SECRET: SECRETLOCAL, BRAND }
  } else {
    return { BUCKET: BUCKET, BRAND, PROFILE: PROFILE }
  }
}

module.exports = {
  check: checkFolder,
  getAccessData: getAccessData
}
