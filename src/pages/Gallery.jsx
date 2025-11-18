import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery(){
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)

  useEffect(()=>{
    const fetchGallery = async () => {
      try{
        const snap = await getDocs(collection(db, 'gallery'))
        setItems(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){
        setItems([])
      }
    }
    fetchGallery()
  },[])

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Gallery</h1>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]"><div className="space-y-4">
          {items.map(img => (
            <motion.img loading="lazy" whileHover={{scale:1.02}} key={img.id} src={img.url} alt={img.caption || 'Gallery image'} onClick={()=>setActive(img)} className="w-full rounded-2xl break-inside-avoid cursor-pointer shadow-lg ring-1 ring-white/10"/>
          ))}
        </div></div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}>
            <motion.img loading="lazy" initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} src={active.url} alt="Preview" className="max-h-[80vh] rounded-2xl shadow-2xl"/>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}
