import Image from 'next/image'
import Link from 'next/link'

import { Layout } from '@/components/Layout'
import { search } from '@/services/search'
import { Text } from '@nextui-org/react'

export default function Search({ query, results }) {
  return (
    <>
      <Layout title={`Results for ${query}`} description={`Search results for ${query}`}>
        <Text h1 className='text-lg font-bold pb-4'>
          {results.length} Resultados para {query}
        </Text>
        <ul>
          {results.map(({ id, title, img, alt }) => (
            <li key={id} className='rounded-lg overflow-hidden'>
              <Link
                href={`/comic/${id}`}
                className='flex flex-row justify-start bg-slate-200 hover:bg-slate-50 content-center p-2'
              >
                <Image className='rounded-full aspect-square' width={50} height={50} src={img} alt={alt} />
                <div>
                  <h2>{title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}
