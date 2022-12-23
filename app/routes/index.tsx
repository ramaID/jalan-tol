import { Form, useLoaderData } from '@remix-run/react'
import createServerSupabase from '~/utils/supabase.server'
import { json } from '@remix-run/node'
import Login from '~/components/login'

import type { LoaderArgs } from '@remix-run/node'
import type { ActionArgs } from '@remix-run/node'

export const action = async ({ request }: ActionArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({
    request,
    response,
  })

  const { name } = Object.fromEntries(
    await request.formData()
  )
  const { error } = await supabase
    .from('gerbang')
    .insert({ name: String(name) })

  if (error) {
    console.log(error)
  }

  return json(null, { headers: response.headers })
}

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
      <Form method="post">
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    </>
  )
}
