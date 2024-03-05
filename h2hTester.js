const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
const dotenv = require('dotenv')

dotenv.config()

const ssh = new NodeSSH()
const passphrase = process.env.PASSPHRASE;
const homePath = process.env.HOME_PATH

try { 
  ssh.connect({
    host: 'github.com',
    username: 'git',
    privateKeyPath: `${homePath}.ssh/id_ed25519`,
    passphrase

  }).then(function(status) {
    console.log(status)
  })
} catch(exception) {
  console.log(exception)
}
