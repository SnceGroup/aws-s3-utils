const fs = require('fs')
const async = require('async')
const AWS = require('aws-sdk')
const helper = require('../helper')
require('dotenv').config()
const mime = require('mime-types')
const s3Helper = require('./_s3-helper');
let s3
let currentVersion = ''

async function deploy (upload, accessData, isLocalRelease) {
  if (isLocalRelease) {
    currentVersion = 'local'
    s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: accessData.KEY,
      secretAccessKey: accessData.SECRET
    })
  } else {
    currentVersion = helper.getExecCommandOutput('cat MANIFEST').trim()
    AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: accessData.PROFILE })
    s3 = new AWS.S3({
      signatureVersion: 'v4'
    })
  }
  const filesToUpload = await s3Helper.getFiles(upload)
  return new Promise((resolve, reject) => {
    async.forEachOf(
      filesToUpload,
      async.asyncify(async file => {
        const fileName = file.includes('MANIFEST') ? file.replace('build/', '') : file.replace('build/', currentVersion + '/')
        let contentEncoding = ''
        if (fileName.includes('style.css') || fileName.includes('style.min.css') || fileName.includes('style-ecommerce.min.css') || fileName.includes('style-ecommerce.css') || fileName.includes('style-alternative-font.css') || fileName.includes('style-alternative-font.min.css') || fileName.includes('js')) {
          contentEncoding = 'gzip'
        }
        const Key =
          'frontend/' + accessData.BRAND + '/' + fileName
        console.log(`uploading: [${Key}]`)
        if (!Key.includes('.html')) {
          return new Promise((res, rej) => {
            s3.upload(
              {
                Key,
                Bucket: accessData.BUCKET,
                Body: fs.readFileSync(file),
                CacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
                ContentType: mime.lookup(file) ? mime.lookup(file) : '',
                ContentEncoding: contentEncoding,
                ACL: 'public-read'
              },
              err => {
                if (err) {
                  return rej(new Error(err))
                }
                res({ result: true })
              }
            )
          })
        }
      }),
      err => {
        if (err) {
          return reject(new Error(err))
        }
        resolve({ result: true })
      }
    )
  })
}


module.exports = {
  run: deploy,
};