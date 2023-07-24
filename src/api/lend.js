import { request } from "./request"

const API = {
  WITHDRAW: '/defed/lending/withdraw',
  //用户直接还款
  postRepay: '/defed/lending/repay',
  //用户借款
  postBorrow: '/defed/lending/borrow',
  //搜索转账人
  transferSearch: '/defed/v2/proxy/transferSearch',
  //用户内部转账 saving
  postInnerTransfer: '/defed/lending/transferInner',
  //用户内部转账 credit
  postInnerTransferCredit: '/defed/lending/transferCreditInner',
  //proxy入金查询
  getDepositInfo: '/defed/lending/proxy/deposit/info',
  //proxy入金
  postProxyDeposit: '/defed/lending/proxy/deposit',
  //proxy approve
  postApprove: '/defed/lending/approve',
}

export const postApproveAPI = (data) => request.post(API.postApprove, data)

export const getDepositInfoAPI = (token) => request.get(API.getDepositInfo, { params: { token } })

export const postProxyDepositAPI = (data) => request.post(API.postProxyDeposit, data)

export const withdrawTo = (data) => request.post(API.WITHDRAW, data)

/**
 * 
 * @param {boolean} isSaving 
 * @param {any} data 
 * @returns 
 */
export const tranferTo = (isSaving, data) => {
  const apiUrl = isSaving ? API.postInnerTransfer : API.postInnerTransferCredit
  return request.post(apiUrl, data)
}

export const repayAPI = (data) => request.post(API.postRepay, data)

export const borrowAPI = (data) => request.post(API.postBorrow, data)