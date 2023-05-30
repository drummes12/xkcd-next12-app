import { NextUIProvider } from '@nextui-org/react'
import '@/styles/global.css'
import Head from 'next/head'
import { I18NProvider } from '@/context/i18n'

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <I18NProvider>
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  )
}
