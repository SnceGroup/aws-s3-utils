var execSync = require('child_process').execSync
var path = require('path')

var SEPARATOR = process.platform === 'win32' ? ';' : ':'
var env = Object.assign({}, process.env)
env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH

/**
 * Execute a command
 * Reference: https://www.nczonline.net/blog/2016/03/mimicking-npm-script-in-node-js/
 *
 * @param {String} command The command to execute.
 */
module.exports = function (command) {
  var output = execSync(command, {
    cwd: process.cwd(),
    env: env,
    shell: true,
    stdio: 'inherit'
  })
}
