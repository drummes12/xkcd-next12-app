import { useI18N } from "@/context/i18n"

export function Footer  () {
  const { t } = useI18N()
  return (
    <footer className='text-center py-4'>
      <a href='https://xkcd.com' target='_blank' rel='noopener noreferrer'>
        {t('FOOTER')}
      </a>
    </footer>
  )
}
