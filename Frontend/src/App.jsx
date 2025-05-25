import './App.css'
import React from 'react'
import Navbar from "./components/Navbar"
import Hero1 from './components/Hero1'
import Features from './components/Features'
import Companies from './components/Companies'
import Reviews from './components/Reviews'
import Jobs from './components/Jobs'

function App() {

  return (
    <>
    <Navbar />
    <Hero1 />
    <Features />
    <Companies />
    <Reviews />
    <Jobs />
    </>
  )
}

export default App
