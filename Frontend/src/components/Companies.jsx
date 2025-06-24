import React from 'react';
import chase from '../assets/chase.png';
import dropbox from '../assets/dropbox.png';
import goldman from '../assets/goldman-sacks.png';
import google from '../assets/google.png';
import ibm from '../assets/ibm.png';
import microsoft from '../assets/microsoft.png';
import salesforce from '../assets/salesforce.png';
import spotify from '../assets/spotify.png';
import twitter from '../assets/twitter.png';
import uber from '../assets/uber.png';
import useScrollAnimation from '../animation/useScrollAnimation'; 

const CompanyLogos = [ 
  { title: 'Chase', url: chase },
  { title: 'Dropbox', url: dropbox },
  { title: 'Goldman Sachs', url: goldman },
  { title: 'Google', url: google },
  { title: 'IBM', url: ibm },
  { title: 'Microsoft', url: microsoft },
  { title: 'Salesforce', url: salesforce },
  { title: 'Spotify', url: spotify },
  { title: 'Twitter', url: twitter },
  { title: 'Uber', url: uber }
];

const Companies = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className={`py-16 sm:py-20 bg-gray-50 overflow-hidden ${isVisible ? 'slide-up-active' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl sm:text-2xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Join <strong className="font-semibold text-blue-600">thousands</strong> of job seekers who've successfully managed their applications and landed roles at leading companies.
        </p>

        
        <div className="relative w-full overflow-hidden mt-12 py-4">
          
          <div className="flex animate-scroll-logos">
            {[...CompanyLogos, ...CompanyLogos].map((comp, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-10 lg:mx-12 opacity-80 hover:opacity-100 transition-opacity duration-300 transform hover:scale-105">
                <img src={comp.url} alt={`${comp.title} logo`} className="h-10 sm:h-12 lg:h-14 object-contain grayscale hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <style jsx>{`
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Scrolls half of the duplicated list */
          }
        }
        .animate-scroll-logos {
          animation: scroll-logos 40s linear infinite; /* Adjust duration as needed */
        }
      `}</style>
    </section>
  );
};

export default Companies;