import Navbar from './Navbar'
import Footer from './Footer'
export default function Layout({children}){return (<div className='site-root'><Navbar/>{children}<Footer/></div>)}
