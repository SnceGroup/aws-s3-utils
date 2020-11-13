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

/**
 * Upload files frm given folder on AWS S3 bucket
 * @param {string} buildFolder folder to be uploade.
 */
const upload = (function (buildFolder) {
  const helper = require('./modules/_s3-uploader');
  console.log('> Upload on AWS S3 Bucket Start')
  helper.upload(buildFolder).then(() => {
    console.log('> Upload on AWS S3 Bucket End')
    process.exit(0)
  })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}())

module.exports = { getAccessData, getBrand, isLocalRelease, upload }