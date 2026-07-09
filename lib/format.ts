/** Shorten an Ethereum address, e.g. 0x1234...abcd */
export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`
}

/** Format a unix timestamp (seconds, bigint) to a readable local string. */
export function formatTimestamp(timestamp: bigint): string {
  const ms = Number(timestamp) * 1000
  if (!ms) return ''
  return new Date(ms).toLocaleString()
}
