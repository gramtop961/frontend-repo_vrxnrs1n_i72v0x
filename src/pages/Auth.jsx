import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore'

export default function AuthPage(){
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=> setUser(u))
    return () => unsub()
  },[])

  const register = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'clients', cred.user.uid), { email, createdAt: new Date().toISOString() })
    }catch(e){ setError(e.message) }
  }

  const login = async (e) => {
    e.preventDefault()
    setError('')
    try{
      await signInWithEmailAndPassword(auth, email, password)
    }catch(e){ setError(e.message) }
  }

  return (
    <Layout>
      <section className="max-w-md mx-auto px-4 pt-36 pb-16">
        <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
          <h1 className="text-2xl font-bold text-white mb-4">{mode==='login' ? 'Login' : 'Create Account'}</h1>
          <form onSubmit={mode==='login'?login:register} className="space-y-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"/>
            <button className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">{mode==='login'? 'Login' : 'Register'}</button>
          </form>
          {error && <div className="text-red-400 text-sm mt-3">{error}</div>}
          <div className="text-white/70 text-sm mt-4">
            {mode==='login' ? (
              <button className="underline" onClick={()=>setMode('register')}>No account? Create one</button>
            ) : (
              <button className="underline" onClick={()=>setMode('login')}>Have an account? Login</button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
