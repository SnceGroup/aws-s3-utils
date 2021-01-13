const fs = require('fs')
const async = require('async')
const AWS = require('aws-sdk')
const helper = require('../helper')
require('dotenv').config()
const mime = require('mime-types')
const s3Helper = require('./_s3-helper');

async function deploy(upload, destination, accessData, type, releaseName, compressedFileExt) {
  let s3
  const currentVersion = releaseName.length > 0 ? releaseName : helper.getExecCommandOutput('cat MANIFEST').trim();
  if (type === 'ENV') {
    s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: accessData.KEY,
      secretAccessKey: accessData.SECRET
    })
  } else {
    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: accessData.PROFILE})
    s3 = new AWS.S3({
      signatureVersion: 'v4'
    })
  }
  const filesToUpload = await s3Helper.getFiles(upload)
  return new Promise((resolve, reject) => {
    async.forEachOf(filesToUpload, async.asyncify(async file => {
        let fileName = file.includes('MANIFEST') || file.includes('RELEASES') ? file.split('/').slice(1).join('/') : currentVersion + '/' + file.split('/').slice(1).join('/')
        let contentEncoding = new RegExp(compressedFileExt.join("|")).test(fileName) ? 'gzip' : '';
        if (fileName.includes('/critical/')){
          contentEncoding = '';
        }
        const Key = destination + '/' + fileName
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
                res({result: true})
              }
            )
          })
        }
      }),
      err => {
        if (err) {
          return reject(new Error(err))
        }
        resolve({result: true})
      }
    )
  })
}


module.exports = {
  run: deploy,
};