import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Stylists from './pages/Stylists'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import AuthPage from './pages/Auth'
import Profile from './pages/Profile'

function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/stylists" element={<Stylists />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
