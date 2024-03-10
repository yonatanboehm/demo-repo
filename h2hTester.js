const Client = require('ssh2-sftp-client');
const fs = require('fs')

const sftp = new Client();

const sftpTestConnection = (configObject) => {
  sftp.connect(configObject)
  .then(() => {
    return sftp.exists('/')
  })
  .then(data => {
    console.log(data)
    console.log('Successful connection')
  }).then(() => {
    sftp.end();
  }).catch(err => {
    console.error(err.message)
    sftp.end();
  })
}

module.exports = { sftpTestConnection }