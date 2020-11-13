const helper = require('../helper')
require('dotenv').config()
const fs = require('fs')
const readdir = require('recursive-readdir')

const currentBranch = helper.getCurrentBranch()
const PROFILE = 'sandwatch-frontend'

/**
 * Returns if is a local release
 */
const _isLocalRelease = function () {
  const manifest = helper.getExecCommandOutput('cat MANIFEST').trim()
  if (manifest === 'local') {
    return true
  }
  return !(currentBranch === 'master' ||
    currentBranch === 'prod' ||
    currentBranch === 'pre' ||
    currentBranch === 'staging' ||
    currentBranch === 'dev')
}

/**
 * Returns access data for AWS S3 account.
 */
const _getAccessData = function () {
  const { BRAND } = process.env
  const { BUCKET } = process.env
  if (_isLocalRelease()) {
    const { BUCKETLOCAL, KEYLOCAL, SECRETLOCAL } = process.env
    return { BUCKET: BUCKETLOCAL, KEY: KEYLOCAL, SECRET: SECRETLOCAL, BRAND }
  } else {
    return { BUCKET: BUCKET, BRAND, PROFILE: PROFILE }
  }
}

const _getFiles = function (dirPath) {
  return fs.existsSync(dirPath) ? readdir(dirPath) : []
}


module.exports = {
  isLocaleRelease: _isLocalRelease,
  getAccessData: _getAccessData,
  getFiles: _getFiles
}
