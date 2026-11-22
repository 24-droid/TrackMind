import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    text: "I was amazed at how quickly and efficiently this tool revamped my resume. It's not just about a better resume; it's about a resume that's perfectly tailored to each job I apply for. The difference is clear in the response I'm getting from companies.",
    name: "Om Singh",
    position: "Web Developer @SoundSafe.ai"
  },
  {
    text: "I love TrackMind, having used it in the last year during a layoff. The interface is easy to use, the customization is key and helps keep one organized, and the ability to export details was an unexpected bonus. Highly recommended!",
    name: "Will Young",
    position: "Software Engineer @Microsoft"
  },
  {
    text: "The speed and precision of this AI resume analyzer have been a game-changer for my job search. Within seconds, it tailored my resume, showcasing my skills in a way that resonates with employers. I've landed more interviews than ever!",
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
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 tracking-tight">
          Success Stories from <span className="gradient-text">Top Professionals</span>
        </h2>

        <div className="relative glass p-8 md:p-12 rounded-[2.5rem]">
          <div className="flex justify-center mb-8 gap-1">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="w-6 h-6 text-amber-400 fill-current" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed italic mb-10">
                "{currentReview.text}"
              </blockquote>

              <div className="text-center">
                <div className="font-bold text-xl text-slate-900 mb-1">
                  {currentReview.name}
                </div>
                <div className="text-slate-600 font-medium">
                  {currentReview.position}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 md:-left-6 md:-right-6">
            <button
              onClick={handlePrevious}
              className="p-3 glass rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/10 transition-all duration-300 shadow-xl"
              aria-label="Previous review"
            >
              <HiChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 glass rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/10 transition-all duration-300 shadow-xl"
              aria-label="Next review"
            >
              <HiChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10 gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === currentReviewIndex ? 'w-8 bg-sky-500' : 'w-2 bg-slate-100 hover:bg-slate-700'
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