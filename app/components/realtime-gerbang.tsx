import { useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'

import type { Database } from '~/utils/db_types'
import type { SupabaseOutletContext } from '~/root'

type Gerbang =
  Database['public']['Tables']['gerbang']['Row']

export default function RealtimeGerbang({
  serverListGerbang,
}: {
  serverListGerbang: Gerbang[]
}) {
  const [listGerbang, setListGerbang] = useState(
    serverListGerbang
  )
  const { supabase } =
    useOutletContext<SupabaseOutletContext>()

  useEffect(() => {
    setListGerbang(serverListGerbang)
  }, [serverListGerbang])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'gerbang',
        },
        (payload) => {
          const newGerbang = payload.new as Gerbang

          if (
            !listGerbang.find(
              (item) => item.id === newGerbang.id
            )
          ) {
            setListGerbang([...listGerbang, newGerbang])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, listGerbang, setListGerbang])

  return <pre>{JSON.stringify(listGerbang, null, 2)}</pre>
}
