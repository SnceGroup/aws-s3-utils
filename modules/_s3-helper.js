// TODO move s3_helper method into generic helper files
require('dotenv').config()
const fs = require('fs')
const readdir = require('recursive-readdir')

/**
 * Returns access data for AWS S3 account.
 * @param {string} type - type of credentials to be used (PROFILE: use AWS profile, ENV: use key and secret from .env file)
 * @param {string} profile - profile name to be used for login using AWS profile (optional)
 */
// TODO upgrade this method for ENV file (adding a prefix)
const _getAccessData = function (type, profile) {
  const { BRAND } = process.env
  const { BUCKET } = process.env
  if (type === 'PROFILE') {
    const PROFILE = profile.length > 0 ? profile : 'sandwatch-frontend'
    return { BUCKET: BUCKET, BRAND, PROFILE: PROFILE }
  } else if (type === 'ENV') {
    const { BUCKETLOCAL, KEYLOCAL, SECRETLOCAL } = process.env
    return { BUCKET: BUCKETLOCAL, KEY: KEYLOCAL, SECRET: SECRETLOCAL, BRAND }
  }
}

function _getFiles (dirPath) {
  return fs.existsSync(dirPath) ? readdir(dirPath) : []
}

module.exports = {
  getAccessData: _getAccessData,
  getFiles: _getFiles
}