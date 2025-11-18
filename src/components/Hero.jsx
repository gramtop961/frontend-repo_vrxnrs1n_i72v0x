import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,215,0,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,215,0,0.12),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(255,215,0,0.1),transparent_35%)]"/>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black"/>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">Your Style,</span> Your Confidence
            </motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="mt-6 text-lg text-white/80 max-w-xl">Luxury salon services crafted to elevate your everyday. Precision cuts, bespoke color, and indulgent care in a serene space.</motion.p>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="mt-8 flex gap-4">
              <a href="/booking" className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-xl shadow-amber-500/30 hover:shadow-amber-400/50">Book Now</a>
              <a href="/services" className="px-6 py-3 rounded-full border border-yellow-500/60 text-yellow-300 hover:bg-yellow-500/10">Explore Services</a>
            </motion.div>
          </div>
          <div className="relative">
            <motion.img loading="lazy" initial={{opacity:0, scale:0.9}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.8}} src="https://images.unsplash.com/photo-1616394584738-fc6e612e69a5?q=80&w=1600&auto=format&fit=crop" alt="Salon" className="w-full rounded-3xl shadow-2xl ring-1 ring-white/10"/>
            <div className="absolute -z-10 -inset-6 rounded-[2rem] bg-gradient-to-tr from-yellow-500/10 to-transparent blur-2xl"/>
          </div>
        </div>
      </div>
    </section>
  )
}
