/**
 * 邮箱用户通过私钥获取 712 签名
 */
import {
  signTypedData,
  SignTypedDataVersion,
  encrypt,
  decrypt,
  getEncryptionPublicKey,
} from '@metamask/eth-sig-util'
import { toBuffer, bufferToHex } from 'ethereumjs-util'

export function getSignature(privateKey, data) {
  return signTypedData({
    privateKey: toBuffer(privateKey),
    data,
    version: SignTypedDataVersion.V4
  })
}

/**
 * 使用公钥加密数据 小狐狸和邮箱通用加密方法
 */
export function encryptedMessage(encryptionPublicKey, message) {
  return bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: encryptionPublicKey,
          data: message,
          version: 'x25519-xsalsa20-poly1305'
        })
      ), 'utf8')
  )
}

/**
 * 邮箱用户通过私钥获取到加密公钥
 */
export function getEncryptPublicKey(privateKey) {
  // privateKey去掉 0x 开头
  const _privateKey = privateKey.slice(2)
  return getEncryptionPublicKey(_privateKey)
}

/**
 * 邮箱用户通过私钥将加密公钥加密后的信息进行解密
 */
export function decryptByPrivateKey(privateKey, encryptStr) {
  // privateKey去掉 0x 开头
  const _privateKey = privateKey.slice(2)
  const data = JSON.parse(toBuffer(encryptStr).toString('utf-8'))
  return decrypt({
    encryptedData: {
      version: data.version,
      ephemPublicKey: data.ephemPublicKey,
      nonce: data.nonce,
      ciphertext: data.ciphertext,
    },
    privateKey: _privateKey
  })
}