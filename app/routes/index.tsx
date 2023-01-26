import { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

const tableSize = 5

export const loader = async ({ request }: DataFunctionArgs) => {
  const catBreeds: { data: { breed: string; coat: string }[] } = await (
    await fetch(`https://catfact.ninja/breeds?limit=${tableSize}`)
  ).json()
  const catFacts: { data: { fact: string; length: number }[] } = await (
    await fetch(`https://catfact.ninja/facts?limit=${tableSize}`)
  ).json()

  return catBreeds.data.map((cb, i) => ({
    breed: cb.breed,
    coat: cb.coat,
    fact: catFacts.data[i].fact,
  }))
}

type CatItem = Awaited<ReturnType<typeof loader>>[number]

const CatRow = ({ catItem }: { catItem: CatItem }) => (
  <section>
    <h2>{catItem.breed}</h2>
    <dl>
      <dt>
        <b>Coat</b>
      </dt>
      <dd>{catItem.coat}</dd>
      <dt>
        <b>Fact</b>
      </dt>
      <dd>{catItem.fact}</dd>
    </dl>
  </section>
)

export default function Index() {
  const data = useLoaderData<CatItem[]>()

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        padding: 10,
      }}
    >
      <h1>Cat things</h1>
      {data.map((c, i) => (
        <CatRow key={i} catItem={c} />
      ))}
    </div>
  )
}
