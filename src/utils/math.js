import { BigNumber } from 'bignumber.js'

export const valueToBigNumber = (value) => new BigNumber(value)

//精度 => 移除精度
export const removeDecimals = (value, decimals) =>
  valueToBigNumber(value)
    .shiftedBy(decimals * -1)
    .toString()

//无精度 => 添加精度 + 去掉多余的小数位【防止合约报错】
export const addDecimals = (value, decimals) =>
  valueToBigNumber(value).shiftedBy(decimals).toFixed(0, BigNumber.ROUND_DOWN)
