import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export default function Footer(){
  const [settings, setSettings] = useState(null)

  useEffect(()=>{
    const fetchSettings = async () => {
      try{
        const snap = await getDocs(collection(db, 'settings'))
        const docs = snap.docs.map(d=>({id:d.id, ...d.data()}))
        setSettings(docs[0] || {})
      }catch(e){
        setSettings({})
      }
    }
    fetchSettings()
  },[])

  return (
    <footer className="mt-20 bg-gradient-to-b from-zinc-900 to-black text-white/90">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">Luxe Salon</h3>
          <p className="text-white/70">Where premium care meets modern style. Experience elegance, precision, and comfort with every visit.</p>
        </div>
        <div>
          <h4 className="font-medium text-white mb-2">Contact</h4>
          <p className="text-white/70">{settings?.address || '123 Elite Ave, City'}</p>
          <p className="text-white/70">{settings?.phone || '+1 (555) 123-4567'}</p>
          <p className="text-white/70">{settings?.email || 'hello@luxesalon.com'}</p>
        </div>
        <div>
          <h4 className="font-medium text-white mb-2">Follow</h4>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Mail].map((Icon, i)=> (
              <motion.a whileHover={{y:-2, scale:1.05}} key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/60 text-sm">© {new Date().getFullYear()} Luxe Salon. All rights reserved.</div>
    </footer>
  )
}
