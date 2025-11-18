import Layout from '../components/Layout'
import { useState } from 'react'
import { db } from '../firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await addDoc(collection(db, 'contacts'), {...form, createdAt: serverTimestamp()})
      setSent(true)
      setForm({name:'', email:'', message:''})
    }catch(e){}
    setLoading(false)
  }

  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Contact Us</h1>
        <form onSubmit={submit} className="rounded-3xl p-6 bg-white/5 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your name" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/50"/>
            <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/50"/>
          </div>
          <textarea required value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" className="mt-4 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white min-h-[140px] placeholder-white/50"/>
          <button disabled={loading} className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold disabled:opacity-60">{loading ? 'Sending...' : 'Send Message'}</button>
        </form>
        <AnimatePresence>
          {sent && (
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="mt-4 text-green-300">Thanks! We will get back to you shortly.</motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  )
}
