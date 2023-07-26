export const API_URL = 'https://test-legency.defed.finance'
export const L2_RPC_URL = 'https://rpc.ankr.com/polygon_mumbai'
export const L1_RPC_URL = 'https://eth-goerli.public.blastapi.io/'

export const DATAPROVIDER_ADDRESS = '0xd3986A6EB63b4b5D364680911f79b6998782F7E8'

export const L2_TokenControllerV2_Address = '0x19bBb0698e3852Cee30873e009b7D0b50eC39Ae6'

export const L2_DefedProtocol_Address = '0x03a8a14fe399164ffb8cfed0a572bb0416414959'

export const L2_ProxyAdmin = '0x3c813C7E07Ab917D46Da7DFd8B59393F5BBAD305'

export const getTypeDataV2 = (message, chainId) => {
  return {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      ExecTransaction: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "operation", type: "uint8" },
        { name: "nonce", type: "uint256" },
      ],
    },
    primaryType: 'ExecTransaction',
    domain: {
      name: 'Defed Wallet',
      version: '1',
      chainId: chainId || '1',
      verifyingContract: L2_ProxyAdmin,
    },
    message
  }
}
