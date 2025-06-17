import React from 'react'
import Navbar from '../components/Navbar'
import Hero1 from '../components/Hero1'
import Features from '../components/Features'
import Jobs from '../components/Jobs'
import Resume from '../components/Resume'
import Reviews from '../components/Reviews'
import Companies from '../components/Companies'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
    <Navbar />
    <Hero1 />
    <Features />
    <Companies />
    <Reviews />
    <Jobs />
    <Resume />
    <Footer />
    </>
  )
}

export default Home