import Web3 from 'web3'
import { L2_RPC_URL, DATAPROVIDER_ADDRESS } from 'src/config'
import DataProviderABI from 'src/json/DataProviderV2.json'
import { BigNumber } from 'bignumber.js'
import { removeDecimals } from 'src/utils/math'

const TokenSymbols = [
  'ETH',
  'WBTC',
  'USDC',
  'USDT',
  'ETH',
  'WBTC',
  'USDC',
  'USDT',
  'DEFE',
  'MATIC'
]

const FILTERTOKENS = ['polygonETH', 'polygonWBTC', 'polygonMATIC']

export async function getSystemData(proxy = '0x0000000000000000000000000000000000000000') {
  const web3 = new Web3(L2_RPC_URL)
  const dataContract = new web3.eth.Contract(DataProviderABI, DATAPROVIDER_ADDRESS)
  const systemData = await dataContract.methods.getUserSavingData(proxy).call()

  const {
    aTokensBalance,
    chainId,
    dTokensBalance,
    ethPrice,
    tokensAddress,
    tokensDecimals,
    tokensPrice,
    vTokensBalance,
    vTokensAddress,
  } = systemData

  const data = []

  tokensAddress.forEach((item, index) => {
    const symbol = TokenSymbols[index]
    const chainName = ['1', '5'].includes(chainId[index].toString()) ? 'Ethereum' : 'Polygon'
    const name = chainName.toLowerCase() + symbol
    const priceInUsd = new BigNumber(tokensPrice[index]).times(ethPrice).shiftedBy(-18 - 8).toString()

    const numberDecimals = Number(tokensDecimals[index])

    const ethSavingBalance = removeDecimals(aTokensBalance[index], numberDecimals)
    const polygonSavingBalance = removeDecimals(vTokensBalance[index], numberDecimals)
    const variableBorrows = removeDecimals(dTokensBalance[index], numberDecimals)
    const savingBalance = chainName === 'Ethereum' ? ethSavingBalance : polygonSavingBalance

    if (FILTERTOKENS.includes(name)) return

    const _data = {
      token: item,
      vtoken: vTokensAddress[index],
      decimals: numberDecimals,
      symbol: symbol,
      chainName,
      chainId: Number(chainId[index].toString()),
      name,
      priceInUsd,
      variableBorrows,
      savingBalance,
    }
    data.push(_data)
  })

  return data
}