import { Masonry } from 'masonic'
import { Card, Loading, Text } from '@nextui-org/react'

import { Comic } from '@/components/Comic'
import { useLastesComics } from '@/hooks/useLastestComics'
import { useI18N } from '@/context/i18n'

export function ListOfComics() {
  const { lastestComics, stateComics } = useLastesComics()
  const { t } = useI18N()

  return (
    <>
      {stateComics.loading && <Loading className='w-full' type='points' color='currentColor' />}
      {stateComics.error && (
        <Card className='border-red-300/50 bg-red-300/20 items-center' variant='flat'>
          <Card.Body>
            <Text color='#f33'>{t('ERROR_LATEST_COMICS')}</Text>
          </Card.Body>
        </Card>
      )}
      <Masonry itemStyle={{ padding: '0 16px' }} items={lastestComics} render={Comic} columnGutter={20} />
    </>
  )
}
