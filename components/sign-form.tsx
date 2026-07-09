'use client'

import { Loader2, PenLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GUESTBOOK_ABI, GUESTBOOK_ADDRESS } from '@/lib/contract'

export function SignForm({ onConfirmed }: { onConfirmed?: () => void }) {
  const { isConnected } = useAccount()
  const [message, setMessage] = useState('')

  const {
    data: hash,
    writeContract,
    isPending,
    error,
    reset,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  // When the transaction is confirmed, clear the input and refresh the list.
  useEffect(() => {
    if (isConfirmed) {
      setMessage('')
      onConfirmed?.()
      reset()
    }
  }, [isConfirmed, onConfirmed, reset])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return
    writeContract({
      address: GUESTBOOK_ADDRESS,
      abi: GUESTBOOK_ABI,
      functionName: 'sign',
      args: [trimmed],
    })
  }

  const busy = isPending || isConfirming

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isConnected ? '방명록을 남겨보세요...' : '먼저 지갑을 연결하세요'
          }
          disabled={!isConnected || busy}
          maxLength={280}
          aria-label="방명록 메시지"
        />
        <Button
          type="submit"
          size="lg"
          disabled={!isConnected || busy || !message.trim()}
          className="sm:w-28"
        >
          {busy ? <Loader2 className="animate-spin" /> : <PenLine />}
          {isPending ? '서명 대기' : isConfirming ? '확정 대기' : '남기기'}
        </Button>
      </div>

      {isConfirming && (
        <p className="text-sm text-muted-foreground">
          트랜잭션이 블록에 포함되기를 기다리는 중입니다...
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive">
          {error.message.split('\n')[0]}
        </p>
      )}
    </form>
  )
}
