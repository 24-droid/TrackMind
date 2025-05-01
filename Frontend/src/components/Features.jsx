import React from 'react';
import '../App.css'
const features = [
  {
    title: 'Optimising Resume and Cover Letters',
    description: 'Many job seekers struggle to create tailored resumes and cover letters that match job descriptions effectively, impacting their chances of success.'
  },
  {
    title: 'Tracking Multiple Applications',
    description: 'Keeping track of multiple job applications can feel overwhelming, leading to disorganization and missed opportunities.'
  },
  {
    title: 'Feedback on Applications',
    description: 'A lack of feedback on applications can cause frustration and uncertainty for candidates, making it hard to improve.'
  },
  {
    title: 'Competitive Job Market',
    description: 'The competitive job market requires candidates to adopt a more streamlined and efficient approach to their applications.'
  }
];

const Features = () => {
  return (
    <div className="bg-[#fbfaff] py-12 px-6">
      <h1 className="font-extrabold text-[28px] md:text-[35px] text-center mb-10">
        Overcoming Job Hurdles
      </h1>
      <div className="blocks grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-black rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h2 className="font-bold text-lg mb-3 text-center">{feature.title}</h2>
            <p className="text-sm text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
