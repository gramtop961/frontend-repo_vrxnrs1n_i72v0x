import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Scissors, CalendarDays, Images, User2, Home, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/services', label: 'Services', icon: Scissors },
  { to: '/stylists', label: 'Stylists', icon: Sparkles },
  { to: '/booking', label: 'Booking', icon: CalendarDays },
  { to: '/gallery', label: 'Gallery', icon: Images },
  { to: '/about', label: 'About', icon: Sparkles },
  { to: '/contact', label: 'Contact', icon: CalendarDays },
]

export default function Navbar(){
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) => `px-4 py-2 rounded-full transition-colors ${isActive ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-black' : 'text-white/80 hover:text-white'}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_25px_rgba(255,200,0,0.5)]">
                <Scissors className="text-black" size={22} />
              </div>
              <div className="text-white">
                <div className="text-lg font-semibold tracking-wide">Luxe Salon</div>
                <div className="text-xs text-white/60 -mt-1">Your Style, Your Confidence</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({to,label}) => (
                <NavLink key={to} to={to} className={linkClasses}>{label}</NavLink>
              ))}
              <NavLink to="/auth" className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-medium shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40">Login</NavLink>
            </nav>

            <button onClick={()=>setOpen(true)} className="md:hidden p-2 rounded-lg bg-white/10 text-white">
              <Menu />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden" onClick={()=>setOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', stiffness:260, damping:30}} className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-zinc-900 to-black border-l border-white/10 p-6 md:hidden z-[60]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-white">
                <Scissors size={20} className="text-yellow-400" />
                <span className="font-semibold">Luxe Salon</span>
              </div>
              <button onClick={()=>setOpen(false)} className="p-2 text-white/80 hover:text-white"><X/></button>
            </div>
            <div className="space-y-2">
              {navItems.map(({to,label, icon:Icon}) => (
                <NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-xl ${isActive ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
              <NavLink to="/auth" onClick={()=>setOpen(false)} className="block px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-medium">Login</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
