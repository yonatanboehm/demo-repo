const fs = require('fs')
const dotenv = require('dotenv')
const Client = require('ssh2-sftp-client');

// open sftpGo server

dotenv.config()

const sftp = new Client();

const passphrase = process.env.PASSPHRASE
const homePath = process.env.HOME_PATH

fileToGet = Math.floor(Math.random() * 2 + 1)

sftp.connect({
  host: '127.0.0.1',
  port: '2022',
  username: 'yonatan7',
  privateKey: fs.readFileSync('/home/../Users/yonatanboehm/.ssh/id_ed25519'),
  passphrase
  
}).then(() => {
  return sftp.get(`/Documents/file${fileToGet}.txt`, '/home/../Users/yonatanboehm/newfile.txt')
}).then(() => {
  sftp.end();
})