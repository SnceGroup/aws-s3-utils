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



### <a name="delete"></a>Delete


### <a name="download"></a>Download




