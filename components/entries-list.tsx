'use client'

import { Clock, MessageSquare } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import type { GuestbookEntry } from '@/lib/contract'
import { formatTimestamp, shortenAddress } from '@/lib/format'

type EntriesListProps = {
  entries: readonly GuestbookEntry[]
  isLoading: boolean
  isError: boolean
}

export function EntriesList({ entries, isLoading, isError }: EntriesListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl border border-border bg-muted"
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        방명록을 불러오지 못했습니다. 컨트랙트 주소와 네트워크(Sepolia)를 확인하세요.
      </p>
    )
  }

  if (!entries.length) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-10 text-center">
        <MessageSquare className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          아직 남겨진 방명록이 없습니다. 첫 번째 서명을 남겨보세요!
        </p>
      </div>
    )
  }

  // Newest first.
  const ordered = [...entries].reverse()

  return (
    <div className="flex flex-col gap-3">
      {ordered.map((entry, i) => (
        <Card key={`${entry.author}-${entry.timestamp}-${i}`}>
          <CardContent className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-medium text-foreground">
                {shortenAddress(entry.author)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {formatTimestamp(entry.timestamp)}
              </span>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-foreground">
              {entry.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
