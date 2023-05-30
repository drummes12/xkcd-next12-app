import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@nextui-org/react'

import { useI18N } from '@/context/i18n'
import { search } from '@/services/search'
import { Layout } from '@/components/Layout'

export default function Search({ query, results }) {
  const { t } = useI18N()
  return (
    <Layout title={t('SEO_TITLE_SEARCH', query)} description={t('SEO_DESCRIPTION_SEARCH', query)}>
      <Text h1 className='text-lg font-bold pb-4'>
        {t('TITLE_SEARCH', results.length, query)}
      </Text>
      <ul>
        {results.map(({ id, title, img, alt }) => (
          <li key={id} className='rounded-lg overflow-hidden'>
            <Link
              href={`/comic/${id}`}
              className='flex flex-row justify-start bg-gray-200 hover:bg-gray-50 content-center p-2'
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
