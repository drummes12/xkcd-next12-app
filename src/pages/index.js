import { Text } from '@nextui-org/react'

import { Layout } from '@/components/Layout'
import { ListOfComics } from '@/components/ListOfComics'
import { useI18N } from '@/context/i18n'

export default function Home() {
  const { t } = useI18N()
  return (
    <>
      <Layout title={t('SEO_TITLE_HOME')} description={t('SEO_TITLE_HOME')}>
        <Text h2 className='text-3xl font-bold text-center mb-10'>
          {t('LATEST_COMICS')}
        </Text>
        <section className='max-w-2xl m-auto'>
          <ListOfComics />
        </section>
      </Layout>
    </>
  )
}
