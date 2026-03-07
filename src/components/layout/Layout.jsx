import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-oracle-gradient">
      <Navbar />
      {/* No px/py/max-w here — each page section manages its own spacing */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
