import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFilePdf, FaFileWord, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext'; 

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
        toast.error('Please upload a PDF or DOCX file.');
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setError(null);
      setAnalysisResult(null); 
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOCX file.');
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setError(null);
      setAnalysisResult(null); 
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast.error('Please upload your resume first.');
      return;
    }
    if (!jobRole.trim()) {
      toast.error('Please enter the job role you are applying for.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobRole', jobRole);

    try {
      
      const response = await axios.post('resume/analyze', formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
      });

      setAnalysisResult(response.data);
      toast.success('Resume analyzed successfully!');

    } catch (err) {
      console.error('Resume analysis failed:', err.response || err);
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
      toast.error(err.response?.data?.message || 'Failed to analyze resume.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 my-8"
    >
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        AI Resume Analyzer
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Upload your resume and tell us the job you're applying for. Our AI will predict your ATS score and provide tailored suggestions to help you stand out.
      </p>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 text-blue-700 hover:border-blue-500 hover:bg-blue-100 transition-all cursor-pointer h-48"
          onClick={() => document.getElementById('resume-upload-input').click()}
          role="button"
          aria-label="Upload resume file"
          tabIndex="0"
        >
          <input
            id="resume-upload-input"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          {resumeFile ? (
            <div className="flex flex-col items-center text-center">
              {resumeFile.type === 'application/pdf' ? <FaFilePdf className="text-5xl mb-3 text-red-500" /> : <FaFileWord className="text-5xl mb-3 text-blue-600" />}
              <p className="font-semibold text-lg">{resumeFile.name}</p>
              <p className="text-sm text-gray-600">File ready for analysis</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <FaUpload className="text-4xl mb-3" />
              <p className="font-semibold text-lg">Drag & Drop or Click to Upload</p>
              <p className="text-sm text-gray-600">PDF or DOCX (max 5MB)</p>
            </div>
          )}
        </div>

        
        <div className="flex flex-col justify-between">
          <label htmlFor="job-role" className="block text-gray-700 text-lg font-medium mb-3">
            Job Role You're Applying For
          </label>
          <textarea
            id="job-role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Senior Software Engineer (React/Node.js), Digital Marketing Specialist, Financial Analyst"
            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y min-h-[120px]"
            rows="5"
            aria-label="Job role you are applying for"
          ></textarea>
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !resumeFile || !jobRole.trim()}
            className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md text-lg disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <FaCheckCircle /> Analyze Resume
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm text-center mb-8"
        >
          <FaExclamationCircle className="inline-block mr-2" /> {error}
        </motion.div>
      )}

      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 bg-blue-50 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Analysis Results
          </h3>

          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-blue-500 progress-ring__circle stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${analysisResult.atsScore * 2.51}, 251.2`} 
                  style={{ transition: 'stroke-dasharray 1s ease-out' }}
                ></circle>
                <text x="50" y="50" font-family="Arial" font-size="28" fill="currentColor" textAnchor="middle" alignmentBaseline="middle" className="font-extrabold text-blue-700">
                  {analysisResult.atsScore}
                </text>
                <text x="50" y="70" font-family="Arial" font-size="12" fill="currentColor" textAnchor="middle" alignmentBaseline="middle" className="text-gray-600">
                  / 100
                </text>
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-4">ATS Score</p>
          </div>

          {analysisResult.suggestions?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <FaExclamationCircle className="text-red-500 mr-2" /> Suggestions for Improvement
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysisResult.keywords && (
              <div>
                {analysisResult.keywords.missing?.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <FaExclamationCircle className="text-orange-500 mr-2" /> Missing Keywords
                        </h4>
                        <p className="text-gray-700">Consider adding these relevant keywords to your resume:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysisResult.keywords.missing.map((keyword, index) => (
                                <span key={index} className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {analysisResult.keywords.found?.length > 0 && (
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" /> Keywords Found
                        </h4>
                        <p className="text-gray-700">These keywords were identified in your resume:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysisResult.keywords.found.map((keyword, index) => (
                                <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
              </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeAnalyzer;