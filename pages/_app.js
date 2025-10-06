import '../styles/globals.css'
import '../styles/homepage.css'
import '../styles/about.css'
import '../styles/ira.css'
import '../styles/products.css'
import '../styles/contact.css'
import '../styles/research.css'
import '../styles/glossary.css'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function App({ Component, pageProps }) { 
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
