const { program, commander } = require('commander');


function myParseInt(value) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}


program
  .requiredOption('-h, --host <host address>, address of host SFTP server')
  .option('-P, --PORT <PORT>', 'port of sftp server')
  .option('-u, --username', 'username of local user')
  .option('-p, password <password>', 'password')
  .option('-i, key <private key>', 'path/to/private/key')
  .action((options) => {
    console.log(options)
  })
  .parse();