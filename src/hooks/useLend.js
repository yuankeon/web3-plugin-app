import { getTokenControllerSignData } from 'src/utils/sign'
import { L2_TokenControllerV2_Address, getTypeDataV2 } from 'src/config'
import { getSignature } from 'src/utils/getSignature'
import { withdrawTo } from 'src/api/lend'
import { addDecimals } from 'src/utils/math'

export function useLend() {

  const userWithdraw = async ({ privateKey, amountInput, decimals, vtoken, receiver }) => {
    const { withdraw } = getTokenControllerSignData()
    const nonce = Date.now()
    const _amount = addDecimals(amountInput, decimals)
    const data = withdraw(vtoken, _amount, receiver)
    const message = {
      to: L2_TokenControllerV2_Address,
      value: 0,
      data: data,
      operation: 1,
      nonce,
    }
    const signData = getTypeDataV2(message)
    const signature = getSignature(privateKey, signData)
    const params = {
      vtoken,
      amount: _amount,
      receiver,
      signature,
      chainId: 1,
      ...message,
    }
    delete params.data
    const result = await withdrawTo(params)
    return result
  }

  return { userWithdraw }
}