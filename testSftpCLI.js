const { program, Option } = require('commander');
const { sftpTestConnection } = require('./h2hTester')
const fs = require('fs')

const sftpProgram = program
  .addOption(new Option('-h, --host <host address>, address of host SFTP server').makeOptionMandatory())
  .addOption(new Option('-P, --port <port>', 'port of sftp server', '22'))
  .addOption(new Option('-u, --username <username>', 'username of local user').makeOptionMandatory())
  .addOption(new Option('-p, --password <password>', 'password').conflicts('key'))
  .addOption(new Option('-i, --privateKey <privateKey>', 'path/to/private/key').conflicts('password'))
  .addOption(new Option('-s, --passphrase <passphrase>', 'passphrase for key').conflicts('password'))
  .action((options) => {
    if (!options.password && !options.privateKey) {
      throw new Error('Must include key or password')
    }
    if (options.privateKey) {
      options.privateKey = fs.readFileSync(options.privateKey) // converts path to private key
    }
  })

sftpProgram.parse()

const configSftp = sftpProgram.opts()

sftpTestConnection(configSftp)