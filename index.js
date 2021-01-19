/**
 * Snce AWS Utils object
 * Upload/Download files from given folder on AWS S3 bucket
 * @param {string} type - type of credentials to be used (PROFILE: use AWS profile, ENV: use key and secret from .env file)
 * @param {string} profile - profile name to be used for login using AWS profile (optional)
 */
module.exports = function (type, profile = '') {
  const helper = require('./modules/_s3-helper');
  this.credentialType = type
  this.profileName = profile
  this.accessData = helper.getAccessData(this.credentialType, this.profileName)
  this.excludedFileExt = ['html'];
  this.pathToBeRemoved = '';

  /**
   * Set Bucket name manually instead using .env file
   * @param {string} bucketName bucket name.
   */
  this.setBucket = function setBucket(bucketName) {
    this.accessData.BUCKET = bucketName;
  }

  /**
   * Set Access data manually instead using .env file
   * @param {string} keyValue S3 bucket key value.
   * @param {string} secretValue S3 secret key value.
   * @param {string} bucketValue bucket name.
   */
  this.setAccessData = function setAccessData(keyValue,secretValue, bucketValue) {
    this.accessData.KEY = keyValue;
    this.accessData.SECRET = secretValue;
    this.accessData.BUCKET = bucketValue;
  }

  /**
   * Get Brand name from .env file
   */
  this.getBrand = function getBrand() {
    return this.accessData.BRAND;
  }

  /**
   * Set excluded file ext
   * @param {string[]} fileExt file extension to be excluded during upload.
   */
  this.setExcludedFileExt = function setExcludedFileExt(fileExt) {
    return this.excludedFileExt = fileExt;
  }

  /**
   * Set folder path to be removed from file before upload on S3
   * @param {string} path path to be removed.
   */
  this.setPathToBeRemoved = function setPathToBeRemoved(path) {
    return this.pathToBeRemoved = path;
  }



  /**
   * Upload files from given folder on AWS S3 bucket
   * @param {string} buildFolder folder to be uploaded.
   * @param {string} destinationFolder destination folder on S3 bucket
   * @param {string} releaseName name of the release to be used (optional) fallback is the string into MANIFEST file.
   * @param {string[]} compressedFileExt list of file extension gzipped in order to set right content encoding value (optional)
   * @param {boolean} noReleaseName flag for not using any release name: file will be uploaded directly on root of the bucket (optional)
   */
  this.upload = function upload(buildFolder, destinationFolder= '', releaseName = '', compressedFileExt = [], noReleaseName= false) {
    const uploader = require('./modules/_s3-uploader');
    console.log('> Upload on AWS S3 Bucket Start')
    uploader.run(buildFolder, destinationFolder, this.accessData, this.credentialType, releaseName, compressedFileExt, noReleaseName, this.excludedFileExt, this.pathToBeRemoved).then(() => {
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

  /**
   * Download single file  from given AWS S3 bucket
   * @param {string} filePath path for the file to be downloaded.
   */
  this.download = function (filePath) {
    const downloader = require('./modules/_s3-downloader.js');
    console.log('> Download [' + filePath + '] from AWS S3 Bucket')
    return downloader.run(filePath, this.accessData, this.credentialType);
  }

  /**
   * Delete single file  from given AWS S3 bucket
   * @param {string} filePath path for the file to be downloaded.
   */
  this.delete = function (filePath) {
    const remover = require('./modules/_s3-remover.js');
    console.log('> Remove [' + filePath + '] from AWS S3 Bucket')
    return remover.run(filePath, this.accessData, this.credentialType);
  }
}