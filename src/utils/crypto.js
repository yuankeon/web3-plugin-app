import hmac256 from 'crypto-js/hmac-sha256'
// import AES from 'crypto-js/aes'
import scryptsy from 'scryptsy'

const AES_256_CBC = 'aes-256-cbc';
const IV = "DEFED-DEFE-DEFED";
const SALT = "DEFED";

let _ende_crypt_key_cache = {}

/**
 * 不能轻易修改，否则导致所有数据不能解密
 */
const defaults = {
  N: 128, //循环次数
  r: 1, //总共内存
  p: 2, //按照上面要求并行两次，然后合并结果
  // maxmem: 32 << 20,  // 32 MB, matches SCRYPT_MAX_MEM.
};

export class CryptoUtils {
  // static scryptSync(password, salt, keylen, options = defaults) {
  //   return scryptsy(password, salt, options.N / 1, options.r / 1, options.p / 1, keylen);
  // };

  static hmac256(data) {
    const hash = hmac256(data, 'DEFED');
    return hash.toString()
  }

  // static decrypt(cipherText, password) {
  //   if (!cipherText || !password) throw "no cipher text or password";
  //   let data, key;
  //   if (_ende_crypt_key_cache[password]) {
  //     key = _ende_crypt_key_cache[password];
  //   } else {
  //     key = CryptoUtils.scryptSync(password, SALT, 32);
  //     _ende_crypt_key_cache[password] = key;
  //   }
  //   const iv = Buffer.from(IV, 'utf8');

  //   const decipher = AES.decrypt(AES_256_CBC, key, iv);

  //   return decipher.toString('utf8');
  // }
}