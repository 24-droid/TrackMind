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
  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative border-b border-slate-900">
      <div className="container mx-auto px-4 md:px-6 text-center mb-16 relative z-10">
        <p className="text-xl md:text-2xl font-medium text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Trusted by <span className="text-slate-900 font-bold">thousands</span> of seekers who landed roles at the world's most innovative teams.
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-10">
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-20" />

        <div className="flex animate-scroll-logos whitespace-nowrap">
          {[...CompanyLogos, ...CompanyLogos].map((comp, index) => (
            <div key={index} className="flex-shrink-0 mx-12 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110">
              <img 
                src={comp.url} 
                alt={`${comp.title} logo`} 
                className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 filter" 
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scroll-logos 60s linear infinite;
        }
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Companies;