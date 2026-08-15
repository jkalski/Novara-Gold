import '../styles/globals.css'
import '../styles/homepage.css'
import '../styles/about.css'
import '../styles/ira.css'
import '../styles/products.css'
import '../styles/contact.css'
import '../styles/research.css'
import '../styles/insights.css'
import '../styles/glossary.css'
import '../styles/landing.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const META_PIXEL_ID = '2103043630250342'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  const router = useRouter()

  useEffect(() => {
    const trackPageView = () => {
      if (window.fbq) window.fbq('track', 'PageView')
    }

    router.events.on('routeChangeComplete', trackPageView)
    return () => router.events.off('routeChangeComplete', trackPageView)
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
