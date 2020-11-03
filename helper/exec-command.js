const execSync = require('child_process').execSync
const path = require('path')

let SEPARATOR = process.platform === 'win32' ? ';' : ':'
let env = Object.assign({}, process.env)
env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH

/**
 * Execute a command
 * Reference: https://www.nczonline.net/blog/2016/03/mimicking-npm-script-in-node-js/
 *
 * @param {String} command The command to execute.
 */
module.exports = function (command) {
  let output = execSync(command, {
    cwd: process.cwd(),
    env: env,
    shell: true,
    stdio: 'inherit'
  })
}
