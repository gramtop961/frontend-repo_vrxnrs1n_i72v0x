import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Stylists(){
  const [stylists, setStylists] = useState([])

  useEffect(()=>{
    const fetchStylists = async () => {
      try{
        const snap = await getDocs(collection(db, 'stylists'))
        setStylists(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){
        setStylists([])
      }
    }
    fetchStylists()
  },[])

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Meet Our Stylists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stylists.map((s)=> (
            <motion.div whileHover={{y:-6}} key={s.id} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 shadow-xl">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 ring-1 ring-white/10">
                {s.image ? (
                  <motion.img loading="lazy" whileHover={{scale:1.08}} transition={{type:'spring', stiffness:200, damping:20}} src={s.image} alt={s.name} className="w-full h-full object-cover"/>
                ) : <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900"/>}
              </div>
              <div className="text-white font-semibold">{s.name || 'Stylist'}</div>
              <div className="text-white/60 text-sm">{s.specialty || 'Hair Artist'}</div>
              <div className="text-white/60 text-sm mt-1">{s.workingHours || '10:00 - 18:00'}</div>
              <Link to={`/booking?stylist=${encodeURIComponent(s.name || '')}`} className="mt-4 inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium">Book Now</Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
