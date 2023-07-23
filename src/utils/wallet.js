const Web3 = require("web3");
const web3 = new Web3();
const util = require("ethereumjs-util");

export class WalletUtils {
  static getWallet(privateKey) {
    let wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    let pb = util.privateToPublic(util.toBuffer(wallet.privateKey));
    let publicKey = pb.toString('hex')

    return {
      "privateKey": wallet.privateKey,
      "address": wallet.address,
      "publicKey": "0x" + publicKey
    }
  }
}