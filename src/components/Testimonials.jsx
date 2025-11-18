import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Testimonials(){
  const [reviews, setReviews] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(()=>{
    const fetchReviews = async () => {
      try{
        const q = query(collection(db, 'reviews'), where('approved', '==', true))
        const snap = await getDocs(q)
        setReviews(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){
        setReviews([])
      }
    }
    fetchReviews()
  },[])

  useEffect(()=>{
    if(reviews.length < 2) return
    const t = setInterval(()=> setIndex(i => (i+1)%reviews.length), 4000)
    return () => clearInterval(t)
  },[reviews])

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">What Clients Say</h2>
      <div className="relative rounded-3xl p-8 bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-500/10 to-transparent blur-3xl -z-10"/>
        <div className="h-40 md:h-24">
          <AnimatePresence mode="wait">
            {reviews.length>0 ? (
              <motion.div key={reviews[index]?.id || index} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.4}} className="text-center">
                <p className="text-white/80 text-lg">“{reviews[index]?.comment || 'Amazing experience!'}”</p>
                <div className="mt-3 text-yellow-300 font-medium">{reviews[index]?.name || 'Happy Client'}</div>
              </motion.div>
            ) : (
              <div className="text-center text-white/60">No reviews yet.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
