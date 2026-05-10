import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCloudUpload, HiOutlineDocumentText, HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineLightningBolt } from 'react-icons/hi';
import { toast } from 'react-toastify';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';

const ResumeAnalyzer = () => {
  const { token } = useAuth(); 
  const [resumeFile, setResumeFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid format. Please use PDF or DOCX.');
        return;
      }
      setResumeFile(file);
      setAnalysisResult(null); 
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobRole.trim()) {
      toast.error('Required fields missing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('document', resumeFile);
    formData.append('jobRole', jobRole);

    try {
      const response = await axios.post('resume/ai/analyze-document', formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
      });
      setAnalysisResult(response.data);
      toast.success('Intelligence scan complete.');
    } catch (err) {
      setError(err.response?.data?.message || 'Neural link failed. Try again.');
      toast.error('Analysis interrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <Navbar />
      
      {/* Background Orbs */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[140px] -z-10" />

      <main className="container mx-auto px-4 pt-32 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6"
          >
            <HiOutlineSparkles className="w-4 h-4" /> Powered by Gemini AI
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            ATS <span className="gradient-text">Neural Scanner</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Deep-scan your resume against specific job requirements using advanced neural networks to predict placement success and optimize visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upload Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border-purple-500/20">
              <label className="block text-sm font-bold text-slate-600 mb-4 ml-1">VIRTUAL FILE UPLOAD</label>
              <div 
                onClick={() => document.getElementById('resume-input').click()}
                className="group relative h-64 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              >
                <input id="resume-input" type="file" className="hidden" onChange={handleFileChange} />
                
                {resumeFile ? (
                  <div className="text-center animate-fade-in p-4">
                    <HiOutlineDocumentText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-slate-900 font-bold truncate max-w-[200px]">{resumeFile.name}</p>
                    <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest font-bold">Encrypted & Ready</p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-slate-100 rounded-2xl text-slate-600 group-hover:text-purple-400 transition-colors mb-4">
                      <HiOutlineCloudUpload className="w-10 h-10" />
                    </div>
                    <p className="text-slate-900 font-bold">Inject Document</p>
                    <p className="text-slate-600 text-xs mt-1">PDF / DOCX (MAX 5MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem]">
              <label className="block text-sm font-bold text-slate-600 mb-4 ml-1">TARGET ROLE PARAMETERS</label>
              <textarea
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="Paste the target job description or title..."
                className="w-full h-40 px-4 py-3 bg-white/70 border border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 transition-all resize-none mb-6"
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !resumeFile || !jobRole.trim()}
                className="w-full btn-primary py-4 flex items-center justify-center gap-3 group bg-purple-600 hover:bg-purple-700 shadow-purple-500/20"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Neural Processing...
                  </>
                ) : (
                  <>
                    <HiOutlineLightningBolt className="w-5 h-5 group-hover:scale-125 transition-transform" />
                    Initialize Scan
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {analysisResult ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-10 rounded-[3rem] border-sky-500/20"
                >
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-extrabold text-slate-900">Analysis Matrix</h2>
                    <div className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      SUCCESS PROBABILITY
                    </div>
                  </div>

                  <div className="flex flex-col items-center mb-16">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle className="text-slate-800 stroke-current" strokeWidth="6" cx="50" cy="50" r="44" fill="transparent" />
                        <motion.circle
                          initial={{ strokeDasharray: "0, 276.5" }}
                          animate={{ strokeDasharray: `${(analysisResult.atsScore / 100) * 276.5}, 276.5` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-purple-500 stroke-current"
                          strokeWidth="6"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="44"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-slate-900">{analysisResult.atsScore}</span>
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">ATS Index</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {analysisResult.suggestions?.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-slate-900 font-bold">
                          <HiOutlineLightningBolt className="text-amber-400" /> Improvement Protocol
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {analysisResult.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex gap-3 p-4 bg-white/70 border border-slate-200 rounded-2xl text-sm text-slate-600">
                              <span className="text-amber-500 font-black">!</span>
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {analysisResult.keywords?.missing?.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-slate-900 font-bold flex items-center gap-2">
                            <HiOutlineExclamationCircle className="text-rose-400" /> Missing Keys
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.keywords.missing.map((kw, i) => (
                              <span key={i} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg uppercase">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {analysisResult.keywords?.found?.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-slate-900 font-bold flex items-center gap-2">
                            <HiOutlineCheckCircle className="text-emerald-400" /> Active Keys
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.keywords.found.map((kw, i) => (
                              <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg uppercase">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] glass rounded-[3rem] border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center opacity-50">
                  <div className="w-20 h-20 bg-white/70 rounded-3xl flex items-center justify-center mb-6">
                    <HiOutlineSparkles className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">Neural Output Standby</h3>
                  <p className="text-slate-600 text-sm max-w-xs">Upload your credentials and set target parameters to initialize neural synchronization.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;