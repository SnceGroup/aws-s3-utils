var config = require('../../config.json')
var fs = require('fs')
var execSync = require('child_process').execSync

/**
 * Returns true if the build is running in production mode
 *
 * @returns {Boolean} True if production mode is enabled
 */
var isProductionBuild = function () {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'prod') {
    return true
  }
  return false
}

/**
 * Get the root build folder by checking the NODE_ENV variable
 *
 * @returns {String} The root folder for the build
 */
var getBuildRootFolder = function () {
  if (isProductionBuild()) {
    return config.build.prodDir
  }
  return config.build.devDir
}

/**
 * Create the build folder if it doesn't exist
 */
var createBuildRootFolderIfNotAvailable = function () {
  var buildFolder = getBuildRootFolder()

  if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder)
  }
}

var getCurrentBranch = function () {
  const { BRANCH } = process.env
  return BRANCH
}

var getExecCommandOutput = function (cmd) {
  return execSync(cmd).toString()
}

module.exports = {
  isProductionBuild: isProductionBuild,
  getBuildRootFolder: getBuildRootFolder,
  createBuildRootFolderIfNotAvailable: createBuildRootFolderIfNotAvailable,
  getExecCommandOutput: getExecCommandOutput,
  getCurrentBranch: getCurrentBranch
}
