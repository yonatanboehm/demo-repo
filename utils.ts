import { Config } from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};



export const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect input');
  }

  return text;
};

const parseNumber = (number: unknown): number => {
  if (!isNumber(number) || isNaN(number)) {
    throw new Error('Incorrect input. port: ' + number);
  }

  return number;
};

const toConfig = (object: unknown): Config => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('host' in object && 'port' in object && 'username' in object && ('password' in object || 'privateKey' in object)) {
    const config: Config = {
      host: parseString(object.host),
      username: parseString(object.username),
      port: parseNumber(object.port),
    }
    if ('privateKey' in object) {
      if ('passphrase' in object) {
        config.passphrase = parseString(object.passphrase)
      }
      config.privateKey = parseString(object.privateKey)
    }
    else {
      config.password = parseString(object.password)
    }
    return config
  }
  throw new Error('Incorrect data: some fields are missing');
}

export default toConfig