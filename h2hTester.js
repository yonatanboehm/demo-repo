const dotenv = require('dotenv')
const Client = require('ssh2-sftp-client');
const fs = require('node:fs/promises')

// open sftpGo server

dotenv.config()

const sftp = new Client();

// const passphrase = process.env.PASSPHRASE

const agent = process.env.SSH_AUTH_SOCK

const fileToGet = Math.floor(Math.random() * 2 + 1)

sftp.connect({
  host: '127.0.0.1',
  port: '2022',
  username: 'yonatan7',
  // privateKey: fs.readFileSync('/home/../Users/yonatanboehm/.ssh/id_ed25519'),
  // passphrase,
  agent,
  agentForward: true
  
}).then(() => {
  return sftp.fastGet(`/Documents/file${fileToGet}.txt`, '/home/../Users/yonatanboehm/newfile.txt')
}).then(() => {
  sftp.end();
})