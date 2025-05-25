import React from 'react'
import resume from '../assets/Resume.png'

const Resume = () => {
  return (
    <div className='bg-gradient-to-br from-[#fbfaff] to-[#f4f0ff] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-16'>
      
      
      <div className='w-full max-w-[500px] aspect-[700/570]'>
        <img
          src={resume}
          alt="ATS-Score-Checker"
          className='w-full h-full object-cover rounded-xl shadow-lg'
        />
      </div>

     
      <div className='max-w-xl text-center md:text-left'>
        <h3 className='text-[#6A4FEB] text-sm tracking-wide uppercase mb-2'>
            AI-Powered-Resume-Analyser
        </h3>
        <h2 className='text-[#190445] text-[36px] md:text-[48px] font-extrabold leading-tight mb-4'>
        Get Your Free Resume Score
        </h2>
        <p className='text-[#190445B3] text-[18px] md:text-[20px] mb-6'>
        Tailoring your resume to each application land you more interviews. Use Trackmind's AI to help you better optimize your resume for the right skills, qualifications, and experiences with highlighted keywords and one-click AI suggestions.
        </p>
        <button className='bg-[#C5FFF2] text-[#190445] font-semibold px-6 py-3 rounded-md hover:cursor-pointer transition duration-300 shadow-md'>
          Explore Resume Analyser
        </button>
      </div>
    </div>
  )
}

export default Resume