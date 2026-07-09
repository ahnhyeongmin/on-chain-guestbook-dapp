import type { Abi } from 'viem'

/**
 * On-chain guestbook contract.
 *
 * Replace GUESTBOOK_ADDRESS with your deployed contract address on Sepolia.
 * The ABI below matches a contract exposing:
 *   - function sign(string message)
 *   - function getEntries() view returns (Entry[])
 *   where Entry = { address author; string message; uint256 timestamp }
 */
export const GUESTBOOK_ADDRESS =
  '0x0000000000000000000000000000000000000000' as const

export const GUESTBOOK_ABI = [
  {
    type: 'function',
    name: 'sign',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'message', type: 'string' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getEntries',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'author', type: 'address' },
          { name: 'message', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
        ],
      },
    ],
  },
  {
    type: 'event',
    name: 'Signed',
    inputs: [
      { name: 'author', type: 'address', indexed: true },
      { name: 'message', type: 'string', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
] as const satisfies Abi

/** Shape of a single guestbook entry returned by getEntries(). */
export type GuestbookEntry = {
  author: `0x${string}`
  message: string
  timestamp: bigint
}
