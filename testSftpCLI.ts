import sftpProgram from './configSftp';
import SftpClient from './sftpClientClass'
import { Config } from './types';
import toConfig from './utils';

const main = async () => {
  try {
    sftpProgram.parse(process.argv)
    const configSftp: Config = toConfig(sftpProgram.opts())
    const client = new SftpClient(configSftp)

    await client.sftpConnect()
    await client.sftpGetFile('/Documents/file2.txt', '/Users/yonatanboehm/newfile.txt')
    await client.sftpClose()

  } catch(error) {
    console.error(error)
  }
}

main()