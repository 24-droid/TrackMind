import React, { useState } from 'react';

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
    text: "The speed and precision of this AI resume analyser have been a game-changer for my job search. Within seconds, it tailored my resume, showcasing my skills in a way that was true to my background and resonated with employers. Thanks to this, I've landed more interviews than ever before!",
    name: "Alex FredMan",
    position: "Software Developer @Apple"
  }
];

const Reviews = () => {
  const [currentReviewIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentReviewIndex];

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#fbfaff] px-6 py-10">
      <div className="max-w-3xl text-center font-medium text-2xl text-[#190455] mb-8">
        {currentReview.text}
      </div>

      <div className="flex items-center gap-6">
        <button onClick={handlePrevious} className="text-3xl font-bold text-[#190455] hover:text-purple-700 transition">
          ←
        </button>

        <div className="text-center">
          <div className="font-semibold text-[#190455]">{currentReview.name}</div>
          <div className="text-sm text-gray-600">{currentReview.position}</div>
        </div>

        <button onClick={handleNext} className="text-3xl font-bold text-[#190455] hover:text-purple-700 transition">
          →
        </button>
      </div>
    </div>
  );
};

export default Reviews;
