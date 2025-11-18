import Layout from '../components/Layout'

export default function NotFound(){
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 pt-36 pb-16 text-white">
        <h1 className="text-4xl font-bold mb-2">Page not found</h1>
        <p className="text-white/70">The page you are looking for does not exist.</p>
      </section>
    </Layout>
  )
}
