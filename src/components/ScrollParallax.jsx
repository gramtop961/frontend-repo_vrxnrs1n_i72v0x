import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollParallax({children}){
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], [0, -60])
  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
