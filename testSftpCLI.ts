import { getSftpConfigCLI } from './configSftp';
import SftpClient from './sftpClientClass'
import { Config } from './types';

const main = async () => {
  try {

    const configSftp: Config = getSftpConfigCLI()
    const client = new SftpClient(configSftp)

    await client.sftpConnect()
    await client.sftpGetFile('/Documents/file1.txt', '/Users/yonatanboehm/newfile.txt')
    await client.sftpClose()

  } catch(error) {
    console.error(error)
  }
}

main()