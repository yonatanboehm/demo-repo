const Client = require('ssh2-sftp-client');
const fs = require('fs')

const sftp = new Client();

const sftpTestConnection = (configObject) => {
  let connection
  sftp.connect(configObject)
  .then(() => {
    return sftp.exists('/')
  })
  .then(data => {
    console.log(data)
    console.log('Successful connection')
    connection = true
  }).then(() => {
    sftp.end();
  }).catch(err => {
    console.error(err.message)
    connection = false
    sftp.end();
  })
  return connection
}

module.exports = { sftpTestConnection }