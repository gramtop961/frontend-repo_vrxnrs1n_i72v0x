import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function Services(){
  const [services, setServices] = useState([])

  useEffect(()=>{
    const fetchServices = async () => {
      try{
        const snap = await getDocs(collection(db, 'services'))
        setServices(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){
        setServices([])
      }
    }
    fetchServices()
  },[])

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s)=> (
            <motion.div whileHover={{y:-6}} key={s.id} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3 ring-1 ring-white/10">
                {s.image ? (
                  <motion.img loading="lazy" whileHover={{scale:1.08}} transition={{type:'spring', stiffness:200, damping:20}} src={s.image} alt={s.name} className="w-full h-full object-cover"/>
                ) : <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900"/>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute bottom-3 left-3 text-yellow-300 font-semibold">{s.category || 'General'}</div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-white font-semibold">{s.name || 'Service'}</div>
                  <div className="text-white/60 text-sm">{s.duration || '60 min'}</div>
                </div>
                <div className="text-yellow-300 font-bold">{s.price ? `$${s.price}` : '$—'}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
