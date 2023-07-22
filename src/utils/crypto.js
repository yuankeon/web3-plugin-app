const Crypto = require('crypto');

export class CryptoUtils {
  static hmac256(data, salt) {
    let hash = Crypto.createHmac('sha256', salt);
    hash.update(data)
    let digest = hash.digest('hex')
    return digest;
  }
}