import '../styles/globals.css'
import '../styles/homepage.css'
import '../styles/about.css'
import '../styles/ira.css'
import '../styles/products.css'
import '../styles/contact.css'
import '../styles/news.css'
import Layout from '../components/Layout'
export default function App({ Component, pageProps }) { return (<Layout><Component {...pageProps} /></Layout>) }
