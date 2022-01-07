# AWS S3 Bucket Utils

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

AWS Helper for manage file on AWS S3 bucket, available methods:
- [Upload](#upload)
- [Delete](#delete)
- [Download](#download)


## Requirement 

AWS S3 bucket with valid credentials, access key using profile stored in .aws/credentials or using key from .env file

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i snce-aws-utils
```

## Usage

Require module:
```js
// Load aws-s3-utils.
const snceS3Utils = require('snce-aws-utils');
```

### Module Init
Two different authentication method available for S3:
- `.ENV` file
-  AWS `Profile`

#### .ENV
Sample of .env file
```
#FRONTEND LOCAL S3 BUCKET
KEYLOCAL=
BUCKETLOCAL=
SECRETLOCAL=
```

#### Profile
Set profile name and ensure that you already set valid credentials on AWS


### <a name="upload"></a>Upload
Upload function to be used: `upload()`
Parameter explanation:
```
   * Upload files from given folder on AWS S3 bucket
   * @param {string} buildFolder folder to be uploaded.
   * @param {string} destinationFolder destination folder on S3 bucket
   * @param {string} releaseName name of the release to be used (optional) fallback is the string into MANIFEST file.
   * @param {string[]} compressedFileExt list of file extension gzipped in order to set right content encoding value (optional)
   * @param {boolean} noReleaseName flag for not using any release name: file will be uploaded directly on root of the bucket (optional)
   * @param {string} acl to be used during uploading file (optional: public-read as default)
```

### <a name="delete"></a>Delete
Upload function to be used: `delete()`
Parameter explanation:
```
   * Delete single file  from given AWS S3 bucket
   * @param {string} filePath path for the file to be downloaded.
```


### <a name="download"></a>Download
Upload function to be used: `download()`
Parameter explanation:
```
   * Download single file  from given AWS S3 bucket
   * @param {string} filePath path for the file to be downloaded.
```




