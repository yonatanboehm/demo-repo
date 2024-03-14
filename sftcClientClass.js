const fs = require('fs')
const Client = require('ssh2-sftp-client');

class SftpClient {

  constructor(config) {
    this.config = config;
    this.client = new Client();
  }

  async sftpConnect() {
    try {
      await this.client.connect(this.config)
      console.log('Successful connection')

    } catch(error) {
      console.error('Error: ' + error.message)
    }
  }

  async sftpClose() {
    try {
      if (this.client.sftp) {
        await this.client.end()
        console.log('Connection ended ')
      }
      else {
        throw new Error('Error: not connected to sftp server')
      }
    } catch(error) {
      console.error(error.message)
    }
  }

  async sftpGetFile(remoteFilePath, localFilePath) {
    try {
      if (this.client.sftp) {
        await this.client.get(remoteFilePath, localFilePath);
        const localFile = fs.readFileSync(localFilePath, { encoding: "utf-8"});
        console.log(localFile)
      }
      else {
        throw new Error('Error: not connected to sftp server')
      }
    } catch(error) {
      console.error(error.message)
    }
  }
  
}

module.exports = { SftpClient }