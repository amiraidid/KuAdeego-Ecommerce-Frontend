import React from 'react'
import Intro from './Intro'
import FeaturesSection from './Features'
import ProductShowcase from './ProductShowcase'
import TestimonialsSection from './Testimonials'
import NewsletterSection from './Newsletter'
import LatestProducts from './LatestProducts'
import Contact from './Contact'

function Home() {
  return (
    <div>
      <Intro />
      <FeaturesSection />
      <LatestProducts />
      <ProductShowcase />
      <Contact />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}

export default Home