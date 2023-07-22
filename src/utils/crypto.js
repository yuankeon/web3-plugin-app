import hmac256 from 'crypto-js/hmac-sha256'

export class CryptoUtils {
  static hmac256(data) {
    console.log(data)
    const hash = hmac256(data, 'DEFED');
    return hash.toString()
  }
}