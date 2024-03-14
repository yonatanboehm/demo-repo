const { sftpProgram } = require('./configSftp');
const { SftpClient } = require('./sftcClientClass');

const main = async () => {
  try {
    sftpProgram.parse(process.argv)
    const configSftp = sftpProgram.opts()

    const test = new SftpClient(configSftp)

    await test.sftpConnect()
    await test.sftpGetFile('/Documents/file2.txt', '/Users/yonatanboehm/newfile.txt')
    test.sftpClose()
  } catch(error) {
    console.error(error)
  }
}

main()