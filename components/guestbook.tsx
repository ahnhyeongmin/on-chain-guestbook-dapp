'use client'

import { BookMarked } from 'lucide-react'
import { useReadContract } from 'wagmi'

import { EntriesList } from '@/components/entries-list'
import { SignForm } from '@/components/sign-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { WalletConnect } from '@/components/wallet-connect'
import {
  GUESTBOOK_ABI,
  GUESTBOOK_ADDRESS,
  type GuestbookEntry,
} from '@/lib/contract'

export function Guestbook() {
  const { data, isLoading, isError, refetch } = useReadContract({
    address: GUESTBOOK_ADDRESS,
    abi: GUESTBOOK_ABI,
    functionName: 'getEntries',
  })

  const entries = (data ?? []) as readonly GuestbookEntry[]

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookMarked className="size-5" />
          </span>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-tight">온체인 방명록</h1>
            <p className="text-sm text-muted-foreground">Sepolia 테스트넷</p>
          </div>
        </div>
        <WalletConnect />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>방명록 남기기</CardTitle>
          <CardDescription>
            메시지가 컨트랙트에 영구히 기록됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignForm onConfirmed={() => refetch()} />
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            서명 목록 {entries.length > 0 && `(${entries.length})`}
          </h2>
        </div>
        <EntriesList entries={entries} isLoading={isLoading} isError={isError} />
      </section>
    </main>
  )
}
