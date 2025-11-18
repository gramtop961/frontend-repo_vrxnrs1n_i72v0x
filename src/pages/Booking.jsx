import Layout from '../components/Layout'
import { useEffect, useMemo, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function Booking(){
  const [services, setServices] = useState([])
  const [stylists, setStylists] = useState([])
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ serviceId:'', stylistId:'', date:'', time:'', name:'', phone:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{ const unsub = onAuthStateChanged(auth, setUser); return () => unsub() },[])

  useEffect(()=>{
    const load = async () => {
      try{
        const sSnap = await getDocs(collection(db,'services'))
        const stSnap = await getDocs(collection(db,'stylists'))
        setServices(sSnap.docs.map(d=>({id:d.id, ...d.data()})))
        setStylists(stSnap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){ setServices([]); setStylists([]) }
    }
    load()
  },[])

  const filteredStylists = useMemo(()=>{
    if(!form.serviceId) return stylists
    const service = services.find(s=>s.id===form.serviceId)
    if(!service) return stylists
    return stylists.filter(st => (st.services||[]).includes(service.name))
  },[stylists, services, form.serviceId])

  const submit = async () => {
    setLoading(true)
    try{
      const service = services.find(s=>s.id===form.serviceId)
      const stylist = stylists.find(s=>s.id===form.stylistId)
      await addDoc(collection(db,'appointments'), {
        serviceId: form.serviceId,
        serviceName: service?.name || '',
        stylistId: form.stylistId,
        stylistName: stylist?.name || '',
        date: form.date,
        time: form.time,
        name: form.name,
        phone: form.phone,
        clientId: user?.uid || null,
        createdAt: serverTimestamp(),
      })
      setSuccess(true)
      setStep(1)
      setForm({ serviceId:'', stylistId:'', date:'', time:'', name:'', phone:'' })
    }catch(e){}
    setLoading(false)
  }

  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Book an Appointment</h1>

        <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
          {/* Step indicators */}
          <div className="flex items-center justify-between text-white/70 text-sm mb-6">
            {['Service','Stylist','Date & Time','Details'].map((l,i)=> (
              <div key={l} className={`flex-1 text-center ${step===i+1 ? 'text-yellow-300' : ''}`}>{l}</div>
            ))}
          </div>

          {step===1 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map(s => (
                  <button key={s.id} onClick={()=>{setForm({...form, serviceId:s.id}); setStep(2)}} className={`text-left rounded-2xl p-4 border ${form.serviceId===s.id?'border-yellow-400 bg-yellow-400/10':'border-white/10 bg-white/5'} text-white hover:bg-white/10`}>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-white/60 text-sm">{s.duration} • ${s.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step===2 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredStylists.map(st => (
                  <button key={st.id} onClick={()=>{setForm({...form, stylistId:st.id}); setStep(3)}} className={`text-left rounded-2xl p-4 border ${form.stylistId===st.id?'border-yellow-400 bg-yellow-400/10':'border-white/10 bg-white/5'} text-white hover:bg-white/10`}>
                    <div className="font-semibold">{st.name}</div>
                    <div className="text-white/60 text-sm">{st.specialty}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step===3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
              <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
              <button onClick={()=>setStep(4)} className="sm:col-span-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">Continue</button>
            </div>
          )}

          {step===4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your name" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
              <div className="sm:col-span-2 flex gap-3">
                <button onClick={()=>setStep(3)} className="px-6 py-3 rounded-full border border-white/10 text-white">Back</button>
                <button disabled={loading} onClick={submit} className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold disabled:opacity-60">{loading?'Booking...':'Confirm Booking'}</button>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {success && (
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="mt-4 rounded-2xl p-4 bg-green-500/15 text-green-300 border border-green-500/30">Your appointment has been booked!</motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  )
}
