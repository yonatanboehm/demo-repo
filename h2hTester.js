const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
const dotenv = require('dotenv')
const Client = require('ssh2-sftp-client');
const sftp = new Client();


dotenv.config()

const ssh = new NodeSSH()
const passphrase = process.env.PASSPHRASE;
const homePath = process.env.HOME_PATH


sftp.connect({
  host: '127.0.0.1',
  port: '2022',
  username: 'yonatan7',
  password: 'xknbsrv516'
}).then(() => {
  return sftp.list('/Documents/Elementor/Mesh');
}).then(data => {
  return sftp.get(`/Documents/Elementor/Mesh/${data[0].name}`, '/home/../Users/yonatanboehm/newfile.txt')
}).then(() => {
  sftp.end();
})