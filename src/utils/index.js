/**
 * 
 * @param {string} address 
 * @returns {string}
 */
export const shortAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`
}

export const header = [
  {
    name: 'Asset',
    width: '15%'
  },
  {
    name: 'My Balance',
    width: '15%',
  },
  {
    name: 'My Credit',
    width: '15%',
  },
  {
    name: 'My Debt',
    width: '15%',
  },
  {
    name: 'Operation',
    width: '40%',
  }
]