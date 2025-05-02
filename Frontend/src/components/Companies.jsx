import React from 'react'
import chase from '../assets/chase.png'
import dropbox from '../assets/dropbox.png'
import goldman from '../assets/goldman-sacks.png'
import google from '../assets/google.png'
import ibm from '../assets/ibm.png'
import microsoft from '../assets/microsoft.png'
import salesforce from '../assets/salesforce.png'
import spotify from '../assets/spotify.png'
import twitter from '../assets/twitter.png'
import uber from '../assets/uber.png'

const Company = [
  { title: 'Chase', url: chase },
  { title: 'Dropbox', url: dropbox },
  { title: 'Goldman-Sachs', url: goldman },
  { title: 'Google', url: google },
  { title: 'IBM', url: ibm },
  { title: 'Microsoft', url: microsoft },
  { title: 'Salesforce', url: salesforce },
  { title: 'Spotify', url: spotify },
  { title: 'Twitter', url: twitter },
  { title: 'Uber', url: uber }
]

const Companies = () => {
  return (
    <div className="bg-[#fbfaff] py-12 px-6 flex flex-col items-center justify-center">
      <p className='w-90 md:w-150 text-center text-[20px] px-auto'>
        Join <span className='font-bold'>1000+ </span>job seekers who’ve used Huntr to manage their job search and land jobs at <span className='font-bold'>1000s </span>of companies
      </p>

      
      <div className='flex mt-10 gap-10 overflow-x-auto whitespace-nowrap scrollbar-hide w-full px-4'>
        {Company.map((comp, index) => (
          <div key={index} className='w-28 flex-shrink-0'>
            <img src={comp.url} alt={comp.title} className='mx-auto' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Companies
