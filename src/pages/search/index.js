import { Layout } from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Search({ query, results }) {
  return (
    <>
      <Layout title={`Results for ${query}`} description={`Search results for ${query}`}>
        <h1>
          {results.length} Resultados para {query}
        </h1>
        {results.map(({ id, title, img, alt }) => (
          <Link key={id} href={`/comic/${id}`} className='flex flex-row justify-start bg-slate-300 hover:bg-slate-50 content-center'>
            <Image className='rounded-full' width={50} height={50} src={img} alt={alt} />
            <div>
              <h2>{title}</h2>
            </div>
          </Link>
        ))}
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const results = await fetch(`http://localhost:3000/api/search?q=${q}`).then((res) => res.json())

  return {
    props: {
      query: q,
      results
    }
  }
}
