/**
 * 
 * @param {string} address 
 * @returns {string}
 */
export const shortAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`
}