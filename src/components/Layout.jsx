import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>xkcd - {title}</title>
        <meta name='description' content={description} />
      </Head>
      
      <Header />

      <main className='py-8 px-4 max-w-xl m-auto'>{children}</main>

      <Footer />
    </>
  )
}
