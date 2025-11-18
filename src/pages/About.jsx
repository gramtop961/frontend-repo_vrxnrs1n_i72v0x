import Layout from '../components/Layout'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 pt-36 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.img loading="lazy" initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop" alt="Salon" className="rounded-3xl shadow-2xl ring-1 ring-white/10"/>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-white/80 leading-relaxed">Founded with a passion for craftsmanship and care, Luxe Salon blends artistry with comfort. Our team delivers bespoke services in a tranquil, elevated space designed for modern living.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[{t:'Expert Stylists'},{t:'Premium Products'},{t:'Relaxing Ambience'}].map((v,i)=>(
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white text-center">{v.t}</div>
              ))}
            </div>
            <div className="mt-6">
              <iframe className="w-full h-64 rounded-2xl ring-1 ring-white/10" src="https://maps.google.com/maps?q=Times%20Square%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
