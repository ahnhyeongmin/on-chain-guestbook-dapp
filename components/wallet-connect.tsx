'use client'

import { Wallet } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { Button } from '@/components/ui/button'
import { shortenAddress } from '@/lib/format'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  // Prefer the injected connector (MetaMask / browser wallet).
  const injectedConnector = connectors.find((c) => c.type === 'injected') ?? connectors[0]

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-lg border border-border bg-secondary px-3 py-1.5 font-mono text-sm text-secondary-foreground">
          {shortenAddress(address)}
        </span>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          연결 해제
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => injectedConnector && connect({ connector: injectedConnector })}
      disabled={!injectedConnector || isPending}
    >
      <Wallet />
      {isPending ? '연결 중...' : '지갑 연결'}
    </Button>
  )
}
