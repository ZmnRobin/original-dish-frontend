import React from 'react'
import Hero from '../components/Hero'
import SuccessSection from '../components/SuccessSection'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../components/Footer'
import StatsSection from '../components/StatsSection'
import Devinfo from '../components/Devinfo'

export default function Home() {
  return (
    <div>
        <Hero/>
        <WhyChooseUs/>
        <StatsSection/>
        <SuccessSection/>
        <Devinfo/>
        <Footer/>
    </div>
  )
}
