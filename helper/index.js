// TODO Removed unused method from this helper and move s3_helper method into this file

const config = require('../config.json')
const fs = require('fs')
const execSync = require('child_process').execSync

/**
 * Returns true if the build is running in production mode
 *
 * @returns {Boolean} True if production mode is enabled
 */
const isProductionBuild = function () {
  return !!(process.env.NODE_ENV && process.env.NODE_ENV === 'prod');
}

/**
 * Get the root build folder by checking the NODE_ENV variable
 *
 * @returns {String} The root folder for the build
 */
const getBuildRootFolder = function () {
  if (isProductionBuild()) {
    return config.build.prodDir
  }
  return config.build.devDir
}

/**
 * Create the build folder if it doesn't exist
 */
const createBuildRootFolderIfNotAvailable = function () {
  const buildFolder = getBuildRootFolder()

  if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder)
  }
}

const getCurrentBranch = function () {
  const { BRANCH } = process.env
  return BRANCH
}

const getExecCommandOutput = function (cmd) {
  return execSync(cmd).toString()
}

module.exports = {
  isProductionBuild: isProductionBuild,
  getBuildRootFolder: getBuildRootFolder,
  createBuildRootFolderIfNotAvailable: createBuildRootFolderIfNotAvailable,
  getExecCommandOutput: getExecCommandOutput,
  getCurrentBranch: getCurrentBranch
}
