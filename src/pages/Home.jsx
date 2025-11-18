import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ServiceCarousel from '../components/ServiceCarousel'
import Testimonials from '../components/Testimonials'

export default function Home(){
  return (
    <Layout>
      <Hero />
      <ServiceCarousel />
      <Testimonials />
    </Layout>
  )
}
