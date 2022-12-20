import { useLoaderData } from '@remix-run/react'
import createServerSupabase from '~/utils/supabase.server'
import { json } from '@remix-run/node'
import Login from '~/components/login'

import type { LoaderArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({
    request,
    response,
  })
  const { data } = await supabase.from('gerbang').select()

  return json(
    { gerbang: data ?? [] },
    { headers: response.headers }
  )
}

export default function Index() {
  const { gerbang } = useLoaderData<typeof loader>()

  return (
    <>
      <Login />
      <pre>{JSON.stringify(gerbang, null, 2)}</pre>
    </>
  )
}
