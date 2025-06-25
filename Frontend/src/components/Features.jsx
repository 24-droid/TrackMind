import React from 'react'; 

const features = [
  {
    title: 'Resume & Cover Letter Optimization',
    description: 'Struggling to tailor your resume? Our AI helps you craft perfect, job-winning documents that stand out to recruiters.',
    icon: (
      <svg className="w-10 h-10 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )
  },
  {
    title: 'Effortless Application Tracking',
    description: 'Never lose track of an application again. Centralize your job search, manage statuses, and stay organized effortlessly.',
    icon: (
      <svg className="w-10 h-10 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    )
  },
  {
    title: 'Actionable Feedback Insights',
    description: 'Gain clarity on your applications. Our tools provide insights to help you understand your performance and improve for next time.',
    icon: (
      <svg className="w-10 h-10 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10m-9 4h4M9 10V7m0 0l-3 3m3-3l3 3m6 6v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v4"></path>
      </svg>
    )
  },
  {
    title: 'Navigating a Competitive Market',
    description: 'Stand out in a crowded job market. Streamline your entire application process to increase your efficiency and success rate.',
    icon: (
      <svg className="w-10 h-10 text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6m4 8H6a2 2 0 01-2-2V8a2 2 0 012-2h4"></path>
      </svg>
    )
  }
];

const Features = () => {
  return (
    <section className=" bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 leading-tight">
          Overcoming Job Search Hurdles
        </h2>
        <div className="blocks grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center justify-center text-center border border-gray-100"
            >
              {feature.icon} 
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;