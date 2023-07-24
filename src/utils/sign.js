import Web3 from 'web3'
import TokenController_ABI from 'src/json/TokenController.json'
import DEFED_Protocol_ABI from 'src/json/DefedProtocol.json'
import { L2_TokenControllerV2_Address, L2_DefedProtocol_Address } from 'src/config'

//L2 deposit contract data
export function getDepositSignData() {
  const web3 = new Web3()
  const defedContract = new web3.eth.Contract(DEFED_Protocol_ABI, L2_DefedProtocol_Address)

  /**
   * 
   * @param {string} tokenAddress 
   * @param {string} amount 
   * @param {string} toAddress 
   * @returns 
   */
  const depositERC20 = (tokenAddress, amount, toAddress) => {
    const result = defedContract.methods.depositERC20(tokenAddress, amount, toAddress).encodeABI()
    return result
  }

  /**
   * 
   * @param {string} toAddress 
   * @returns 
   */
  const depositETH = (toAddress) => {
    const result = defedContract.methods.depositETH(toAddress).encodeABI()
    return result
  }

  return { depositERC20, depositETH }
}

export const interestRateMode = 2

//L1 L2 contract data
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