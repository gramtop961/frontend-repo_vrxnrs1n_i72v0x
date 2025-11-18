import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function ServiceCarousel(){
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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Signature Services</h2>
      <div className="relative">
        <div className="grid grid-flow-col auto-cols-[80%] md:auto-cols-[33%] gap-5 overflow-x-auto no-scrollbar pb-2">
          {services.map((s, idx)=> (
            <motion.div whileHover={{y:-6}} key={s.id || idx} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5 shadow-xl min-h-[260px]">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 ring-1 ring-white/10">
                {s.image ? (
                  <motion.img loading="lazy" whileHover={{scale:1.08}} transition={{type:'spring', stiffness:200, damping:20}} src={s.image} alt={s.name} className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900"/>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">{s.name || 'Service'}</div>
                  <div className="text-white/60 text-sm">{s.duration || '60 min'}</div>
                </div>
                <div className="text-yellow-300 font-bold">{s.price ? `$${s.price}` : '$—'}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
