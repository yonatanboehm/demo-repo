import fs from 'fs';
import Client from 'ssh2-sftp-client';

import { Config } from './types'
import sftp from 'ssh2-sftp-client';

class SftpClient {

  private client: sftp

  constructor(private config: Config) {
    this.config = config;
    this.client = new Client();
  }

  async sftpConnect() {
    try {
      await this.client.connect(this.config)
      console.log('Successful connection')

    } catch(error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  async sftpClose() {
    try {
      if (this.client) {
        await this.client.end()
        console.log('Connection ended')
      }
      else {
        throw new Error('Error: not connected to sftp server')
      }
    } catch(error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  async sftpGetFile(remoteFilePath: string, localFilePath: string) {
    try {
      if (this.client) {
        await this.client.get(remoteFilePath, localFilePath);
        const localFile = fs.readFileSync(localFilePath, { encoding: "utf-8"});
        console.log(localFile)
      }
      else {
        throw new Error('Error: not connected to sftp server')
      }
    } catch(error: unknown) {
      await this.client.end()
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
  
}

export default SftpClient