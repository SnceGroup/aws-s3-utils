/**
 * Returns access data for AWS S3 account.
 */
const getAccessData = (function () {
  const helper = require('./modules/_s3-helper');
  return helper.getAccessData();
}())

/**
 * Returns current Brand.
 */
const getBrand = (function () {
  const helper = require('./modules/_s3-helper');
  return helper.getAccessData().BRAND;
}())

/**
 * Returns if is a local release
 */
const isLocalRelease = (function () {
  const helper = require('./modules/_s3-helper');
  return helper.isLocaleRelease()
}())

// TODO add the possibility to choose which type of upload using a parameter:
//  - using .env file
//  - using AWS profile (new parameter for AWS profile to be added)

// TODO add the possibility to choose which the release name:
//  - adding a new parameter
//  - use the default one from MANIFEST

/**
 * Upload files from given folder on AWS S3 bucket
 * @param {string} buildFolder folder to be uploaded.
 */
function upload(buildFolder) {
  const uploader = require('./modules/_s3-uploader');
  console.log('> Upload on AWS S3 Bucket Start')
  uploader.run(buildFolder, getAccessData, isLocalRelease, 'local').then(() => {
    console.log('> Upload on AWS S3 Bucket End')
    process.exit(0)
    return true
  })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
      return false
    })
}

module.exports = {getAccessData, getBrand, isLocalRelease, upload}