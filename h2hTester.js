const Client = require('ssh2-sftp-client');

const sftp = new Client();

const sftpTestConnection = async (configObject) => {
  try {
    const isConnected = await sftp.connect(configObject)
    if (isConnected) {
      console.log('Successful connection')
    }
    await sftp.end()
  } catch (exception) {
    console.error(exception)
  }
}

module.exports = { sftpTestConnection }