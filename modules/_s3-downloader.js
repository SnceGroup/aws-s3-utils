const AWS = require('aws-sdk')
require('dotenv').config()

async function download(filePath, accessData, type) {
  let s3
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

  const paramsOBJ = {
    Bucket: accessData.BUCKET,
    Key: filePath
  }

  return await s3.getObject(paramsOBJ).promise()
}


module.exports = {
  run: download,
};