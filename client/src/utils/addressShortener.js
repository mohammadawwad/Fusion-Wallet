//shows the first 6 character of address and the last 4
export const addressShortener = (address) => `${address.slice(0,5)}...${address.slice(address.length - 4)}`