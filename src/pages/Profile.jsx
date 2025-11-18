import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=> setUser(u))
    return () => unsub()
  },[])

  useEffect(()=>{
    const load = async () => {
      if(!user) return
      try{
        const q = query(collection(db,'appointments'), where('clientId','==', user.uid), orderBy('createdAt','desc'))
        const snap = await getDocs(q)
        setAppointments(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(e){ setAppointments([]) }
    }
    load()
  },[user])

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
        {!user ? (
          <div className="text-white/70">Please login to view your bookings.</div>
        ) : (
          <div className="space-y-4">
            {appointments.map(a => (
              <div key={a.id} className="rounded-2xl p-4 bg-white/5 border border-white/10 text-white">
                <div className="font-semibold">{a.serviceName}</div>
                <div className="text-white/70 text-sm">{a.date} at {a.time}</div>
                <div className="text-white/70 text-sm">Stylist: {a.stylistName}</div>
              </div>
            ))}
            {appointments.length===0 && <div className="text-white/60">No appointments yet.</div>}
          </div>
        )}
      </section>
    </Layout>
  )
}
