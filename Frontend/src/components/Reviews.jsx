import React, { useState } from 'react';
import useScrollAnimation from '../animation/useScrollAnimation'; 

const reviews = [
  {
    text: "I was amazed at how quickly and efficiently this tool revamped my resume. It's not just about a better resume; it's about a resume that's perfectly tailored to each job I apply for. The difference is clear in the response I'm getting from companies. Less time tweaking my resume means more time to prepare for interviews!",
    name: "Om Singh",
    position: "Web Developer @SoundSafe.ai"
  },
  {
    text: "I love TrackMind, having used it in the last year during a layoff. The interface is easy to use, the customization is key and helps keep one organized, and the ability to export details was an unexpected bonus. I recommend this tool to everyone looking for new roles to help organize the search process!",
    name: "Will Young",
    position: "Software Engineer @Microsoft"
  },
  {
    text: "The speed and precision of this AI resume analyzer have been a game-changer for my job search. Within seconds, it tailored my resume, showcasing my skills in a way that was true to my background and resonated with employers. Thanks to this, I've landed more interviews than ever before!",
    name: "Alex FredMan",
    position: "Software Developer @Apple"
  }
];

const Reviews = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [currentReviewIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentReviewIndex];

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          What Our Users Say
        </h2>

        <div ref={ref} className={`mb-8 ${isVisible ? 'slide-up-active' : ''}`}>
          <blockquote
            
            className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-relaxed italic px-4"
            key={currentReviewIndex}
          >
            "{currentReview.text}"
          </blockquote>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrevious}
            className="p-3 text-gray-500 hover:text-blue-600 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous review"
          >
            
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="text-center">
            <div className="font-semibold text-xl text-gray-900 mb-1">
              {currentReview.name}
            </div>
            <div className="text-base text-gray-600">
              {currentReview.position}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="p-3 text-gray-500 hover:text-blue-600 transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next review"
          >
            
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`block w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentReviewIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;