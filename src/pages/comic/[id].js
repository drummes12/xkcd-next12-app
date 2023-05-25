import { Layout } from '@/components/Layout'
import { readFile, readdir, stat } from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import { basename } from 'path'

export default function Comic({ img, alt, title, width, height, hasPrevious, hasNext, nextId, prevId }) {
  return (
    <>
      <Layout title={title} description={'Comics for developers'}>
        <section className='max-w-lg m-auto'>
          <h1 className='font-bold text-xl text-center mb-4'>{title}</h1>
          <div className='max-w-sm m-auto mb-4'>
            <Image width={width} height={height} style={{ margin: 'auto' }} src={img} alt={alt} />
          </div>
          <p>{alt}</p>

          <div className='flex w-full justify-between mt-4 font-bold'>
            {hasPrevious && (
              <Link className='text-gray-600' href={`/comic/${prevId}`}>
                ⬅️ Previous
              </Link>
            )}
            {hasNext && (
              <Link className='text-gray-600' href={`/comic/${nextId}`}>
                Next ➡️
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const files = await readdir('./comics')

  const paths = files.map((file) => {
    const id = basename(file, '.json')
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
    }
  }
}
