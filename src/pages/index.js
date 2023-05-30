import { Text } from '@nextui-org/react'
import fs from 'node:fs/promises'

import { Layout } from '@/components/Layout'
import { useI18N } from '@/context/i18n'
import { ListOfComics } from '@/components/ListOfComics'


export default function Home({ latestComics }) {
  const { t } = useI18N()
  return (
    <>
      <Layout title={t('SEO_TITLE_HOME')} description={t('SEO_TITLE_HOME')}>
        <Text h2 className='text-3xl font-bold text-center mb-10'>
          {t('LATEST_COMICS')}
        </Text>
        <section className='max-w-2xl m-auto'>
          <ListOfComics latestComics={latestComics} />
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-20, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
