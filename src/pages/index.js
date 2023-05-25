import { Layout } from '@/components/Layout'
import { Text } from '@nextui-org/react'
import fs from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'

export default function Home({ lastestComics }) {
  return (
    <>
      <Layout title={'Comics for developers'} description={'Comics for developers'}>
        <Text h2 className='text-3xl font-bold text-center mb-10'>
          Latest Comics
        </Text>
        <section className='grid grid-cols-1 gap-2 max-w-xl m-auto md:grid-cols-2 xl:grid-cols-3'>
          {lastestComics.map(({ id, img, alt, title, width, height }) => (
            <Link className='mb-4 pb-4 m-auto' href={`/comic/${id}`} key={id}>
              <Text h3 className='font-semibold text-sm text-center pb-2'>
                {title}
              </Text>
              <Image width={width} height={height} src={img} alt={alt} />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const lastestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })
  const lastestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      lastestComics
    }
  }
}
