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

export const computedCreditBalance = (raw, priceInETH) => {
  //信用额度取99%+去尾法
  const shrinkCreditInETH = valueToBigNumber(raw).times(0.99).toFixed(0, BigNumber.ROUND_DOWN)
  return valueToBigNumber(shrinkCreditInETH).div(priceInETH).toString()
}

//页面展示数据
export const displayDecimal = (value) => {
  if (isNaN(value)) return value
  //保留四位，向下取整
  return valueToBigNumber(value).toFixed(4, BigNumber.ROUND_DOWN)
}