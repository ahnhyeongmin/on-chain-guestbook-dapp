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
export const GUESTBOOK_ADDRESS = '0x2f205d0C7be5E5Be55D517753eBEf37f42e1F902' as const

// 컨트랙트 ABI
//  -sign(string message): 방명록 작성
//  -getEntries(): 작성된 방명록 목록 조회 
export const GUESTBOOK_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "NewEntry",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "sign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEntries",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Guestbook.Entry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "total",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const satisfies Abi

/** Shape of a single guestbook entry returned by getEntries(). */
export type GuestbookEntry = {
  author: `0x${string}`
  message: string
  timestamp: bigint
}
