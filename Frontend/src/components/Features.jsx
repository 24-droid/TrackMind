import React from 'react'; 
import { HiOutlineDocumentText, HiOutlineClipboardList, HiOutlineLightningBolt, HiOutlineVideoCamera } from 'react-icons/hi';

const features = [
  {
    title: 'AI Resume Optimization',
    description: 'Transform your resume with AI-driven insights that help you beat the ATS and catch the recruiter\'s eye instantly.',
    icon: <HiOutlineDocumentText className="w-8 h-8 text-sky-400" />,
    border: 'border-sky-500/20',
    bg: 'bg-sky-500/5'
  },
  {
    title: 'Smart App Tracking',
    description: 'A dedicated command center for all your job applications. Track statuses, set reminders, and never miss a follow-up.',
    icon: <HiOutlineClipboardList className="w-8 h-8 text-emerald-400" />,
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5'
  },
  {
    title: 'AI Analysis Insights',
    description: 'Get deep analysis on why some applications succeed while others don\'t. Actionable data to refine your strategy.',
    icon: <HiOutlineLightningBolt className="w-8 h-8 text-amber-400" />,
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5'
  },
  {
    title: 'Live AI Mock Interviews',
    description: 'Practice with a highly realistic virtual interviewer. Get instant feedback on your communication and technical skills using advanced voice AI.',
    icon: <HiOutlineVideoCamera className="w-8 h-8 text-rose-500" />,
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5'
  }
];

const Features = () => {
  return (
    <section className="bg-slate-50 py-24 border-y border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Elevate Your <span className="gradient-text">Search Capability</span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to automate your job hunt and land more interviews with less manual effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass p-8 group glass-hover flex flex-col items-start text-left border-l-4 ${feature.border}`}
            >
              <div className={`p-3 rounded-xl mb-6 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-sky-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
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