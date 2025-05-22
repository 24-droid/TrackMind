import './App.css'
import React from 'react'
import Navbar from "./components/Navbar"
import Hero1 from './components/Hero1'
import Features from './components/Features'
import Companies from './components/Companies'
import Reviews from './components/Reviews'

function App() {

  return (
    <>
    <Navbar />
    <Hero1 />
    <Features />
    <Companies />
    <Reviews />
    </>
  )
}

export default App
