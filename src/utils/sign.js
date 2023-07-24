import Web3 from 'web3'
import TokenController_ABI from 'src/json/TokenController.json'
import { L2_TokenControllerV2_Address } from 'src/config'

export const interestRateMode = 2

//L1 L2 withdraw contract data
export function getTokenControllerSignData() {
  const web3 = new Web3()
  const tokenContract = new web3.eth.Contract(TokenController_ABI, L2_TokenControllerV2_Address)

  /**
   * 
   * @param {string} vtokenAddress 
   * @param {string} amount 
   * @param {string} toAddress 
   * @returns 
   */
  const withdraw = (vtokenAddress, amount, toAddress) => {
    const result = tokenContract.methods.withdraw(vtokenAddress, amount, toAddress).encodeABI()
    return result
  }

  /**
   * 
   * @param {string} vtokenAddress 
   * @param {string} amount 
   * @param {string} toAddress 
   * @returns 
   */
  const tranferInner = (vtokenAddress, amount, toAddress) => {
    const result = tokenContract.methods.transfer(vtokenAddress, amount, toAddress).encodeABI()
    return result
  }

  /**
   * 
   * @param {string} vtokenAddress 
   * @param {string} amount 
   * @param {string} toAddress 
   * @returns 
   */
  const tranferInnerCredit = (vtokenAddress, amount, toAddress) => {
    const result = tokenContract.methods.transferCredit(vtokenAddress, amount, toAddress, interestRateMode).encodeABI()
    return result
  }

  /**
   * 
   * @param {string} vtokenAddress 
   * @param {string} amount 
   * @returns 
   */
  const borrowInner = (vtokenAddress, amount) => {
    const result = tokenContract.methods.borrow(vtokenAddress, amount, interestRateMode).encodeABI()
    return result
  }

  /**
   * 
   * @param {string} vtokenAddress 
   * @param {string} amount 
   * @returns 
   */
  const directRepay = (vtokenAddress, amount) => {
    const result = tokenContract.methods.repay(vtokenAddress, amount, interestRateMode).encodeABI()
    return result
  }

  return { withdraw, tranferInner, tranferInnerCredit, borrowInner, directRepay }
}