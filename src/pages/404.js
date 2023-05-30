import { Card, Text } from '@nextui-org/react'

import { Layout } from '@/components/Layout'
import { useI18N } from '@/context/i18n'

export default function Custom404() {
  const { t } = useI18N()
  return (
    <Layout title={t('ERROR_404')} description={t('ERROR_404')}>
      <Card className='border-red-300/50 bg-red-300/20 items-center' variant='flat'>
        <Card.Body>
          <Text color='#f33'>{t('ERROR_404')}</Text>
        </Card.Body>
      </Card>
    </Layout>
  )
}
