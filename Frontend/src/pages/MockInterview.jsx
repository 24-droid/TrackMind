import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineClock, 
  HiOutlineChevronRight, 
  HiOutlineCheckBadge, 
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight, 
  HiOutlineArrowRight,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineSpeakerWave
} from "react-icons/hi2";
import { 
  FiMic, 
  FiMicOff, 
  FiVideo, 
  FiVideoOff, 
  FiPhone
} from "react-icons/fi";
import { toast } from 'react-toastify';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

// Embedding the generated avatar
import InterviewerAvatar from '../assets/interviewer.png';

const MockInterview = () => {
  const [step, setStep] = useState('landing'); // landing, interviewing, analyzing, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(window.speechSynthesis);

  // Toggle Controls
  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getVideoTracks().forEach(track => track.enabled = isCameraOff);
      setIsCameraOff(!isCameraOff);
    }
  };

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getAudioTracks().forEach(track => track.enabled = isMuted);
      setIsMuted(!isMuted);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = transcript;
        setAnswers(updatedAnswers);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'network') {
          toast.warn('Network issue with speech recognition. Attempting to reconnect...');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        // Auto-restart if we're still in the interview and the AI isn't speaking
        if (step === 'interviewing' && !isSpeaking) {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (e) {
            console.log("Recognition already started or failed to restart");
          }
        }
      };
    }
  }, [currentQuestionIndex, answers, step, isSpeaking]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle Video & Audio Stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      toast.error('Camera/Microphone access denied. Please enable them to start.');
      throw err;
    }
  };

  const startRecording = (stream) => {
    audioChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.start();
  };

  const stopRecordingAndGetTranscript = async () => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve(answers[currentQuestionIndex]);
        return;
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        if (audioBlob.size < 1000) { // Too small, probably no speech
          resolve(answers[currentQuestionIndex]);
          return;
        }

        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const response = await axios.post('/interview/stt', formData);
          resolve(response.data.transcript || answers[currentQuestionIndex]);
        } catch (error) {
          console.error("Sarvam STT failed:", error);
          resolve(answers[currentQuestionIndex]); // Fallback to browser transcript
        }
      };
      mediaRecorderRef.current.stop();
    });
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  // Timer logic
  useEffect(() => {
    if (step === 'interviewing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && step === 'interviewing') {
      handleSubmitInterview();
    }
    return () => clearInterval(timerRef.current);
  }, [step, timeLeft]);

  // AI Speaking logic with Sarvam AI and Browser Fallback
  const speakQuestion = async (text) => {
    setIsSpeaking(true);
    setIsListening(false);
    if (recognitionRef.current) recognitionRef.current.stop();

    try {
      // 1. Try Sarvam AI via our Backend
      const response = await axios.post('/interview/tts', { text });
      const audio = new Audio(`data:audio/wav;base64,${response.data.audio}`);
      
      return new Promise((resolve) => {
        audio.onended = () => {
          setIsSpeaking(false);
          setIsListening(true);
          if (recognitionRef.current) recognitionRef.current.start();
          
          // Start background recording for Sarvam STT
          if (videoRef.current?.srcObject) {
            startRecording(videoRef.current.srcObject);
          }
          resolve();
        };
        audio.onerror = () => { throw new Error("Audio playback failed"); };
        audio.play();
      });

    } catch (error) {
      console.warn("Sarvam TTS failed, falling back to browser synthesis:", error.message);
      
      // 2. Fallback to Browser Synthesis
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => 
          (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google uk english female') || v.name.toLowerCase().includes('samantha'))
        );
        if (femaleVoice) utterance.voice = femaleVoice;
        
        utterance.onend = () => {
          setIsSpeaking(false);
          setIsListening(true);
          if (recognitionRef.current) recognitionRef.current.start();
          
          // Start background recording for Sarvam STT
          if (videoRef.current?.srcObject) {
            startRecording(videoRef.current.srcObject);
          }
          resolve();
        };
        synthesisRef.current.speak(utterance);
      });
    }
  };

  // Auto-start camera when entering interviewing step
  useEffect(() => {
    if (step === 'interviewing') {
      startCamera();
    }
    return () => stopCamera();
  }, [step]);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/interview/start');
      setQuestions(response.data.questions);
      setAnswers(new Array(response.data.questions.length).fill(''));
      setStep('interviewing');
      
      // Initial greeting
      await speakQuestion("Hello! I'm your interviewer for today. We'll be discussing your background and technical skills based on your resume. This session will last about 6 minutes. Let's begin with the first question.");
      await speakQuestion(response.data.questions[0]);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start interview.');
      setStep('landing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    setIsLoading(true);
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);

    // Get high-accuracy transcript from Sarvam
    const finalTranscript = await stopRecordingAndGetTranscript();
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = finalTranscript;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      await speakQuestion(questions[nextIndex]);
    } else {
      handleSubmitInterview(updatedAnswers);
    }
    setIsLoading(false);
  };

  const handleSubmitInterview = async (finalAnswers = answers) => {
    clearInterval(timerRef.current);
    if (recognitionRef.current) recognitionRef.current.stop();
    stopCamera();
    setStep('analyzing');
    
    try {
      const response = await axios.post('/interview/feedback', {
        questions,
        answers
      });
      setFeedback(response.data);
      setStep('results');
    } catch (error) {
      toast.error('Failed to generate feedback.');
      setStep('landing');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 font-inter">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 max-w-6xl">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold mb-8">
                <FiVideo className="w-4 h-4" /> Real-time Video Simulation
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                Virtual <span className="text-sky-500">Meeting</span> Interview
              </h1>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                Experience a professional one-on-one video call. Speak naturally, maintain eye contact, and our AI will evaluate your communication and technical depth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700">
                  <FiMic className="w-10 h-10 text-sky-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Voice Activated</h3>
                  <p className="text-slate-400">No typing required. Simply speak your answers as you would in a real interview.</p>
                </div>
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700">
                  <HiOutlineBolt className="text-amber-500 w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Instant Evaluation</h3>
                  <p className="text-slate-400">Get a full transcript and behavioral analysis once the meeting ends.</p>
                </div>
              </div>

              <button
                onClick={startInterview}
                disabled={isLoading}
                className="group relative inline-flex items-center gap-4 bg-sky-500 hover:bg-sky-400 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-sky-500/20"
              >
                {isLoading ? 'Connecting to Meeting...' : 'Join Interview'}
                <HiOutlineChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 'interviewing' && (
            <motion.div
              key="interviewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-6"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-black uppercase">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Connection
                  </div>
                  <span className="text-slate-400 font-medium">Technical Interview - 1st Round</span>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-xl font-mono text-xl text-sky-500 font-bold border border-slate-700">
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                {/* AI Interviewer Tile */}
                <div className="relative group bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl">
                  <img 
                    src={InterviewerAvatar} 
                    alt="AI Interviewer" 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isSpeaking ? 'opacity-100' : 'opacity-80'}`}
                  />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="font-bold">Virtual Interviewer</span>
                    {isSpeaking && <HiOutlineSpeakerWave className="text-sky-400 animate-bounce" />}
                  </div>
                  {isSpeaking && (
                    <div className="absolute inset-0 border-4 border-sky-500 rounded-[2.5rem] animate-pulse pointer-events-none" />
                  )}
                </div>

                {/* User Video Tile */}
                <div className="relative bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover scale-x-[-1]" 
                  />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="font-bold">You (Candidate)</span>
                    {isListening && <FiMic className="text-emerald-400 animate-pulse" />}
                  </div>
                </div>
              </div>

              {/* Subtitles & Controls */}
              <div className="space-y-6">
                <div className="min-h-[100px] bg-slate-800/30 backdrop-blur-xl border border-slate-700 p-8 rounded-[2rem] text-center">
                  <p className="text-2xl font-medium text-slate-300 italic">
                    {answers[currentQuestionIndex] || (isListening ? "Listening..." : "Waiting for question...")}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={toggleMic}
                    className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-rose-500' : 'bg-slate-800 border border-slate-700'}`}
                  >
                    {isMuted ? <FiMicOff className="w-6 h-6" /> : <FiMic className="w-6 h-6" />}
                  </button>
                  <button 
                    onClick={toggleCamera}
                    className={`p-4 rounded-2xl transition-all ${isCameraOff ? 'bg-rose-500' : 'bg-slate-800 border border-slate-700'}`}
                  >
                    {isCameraOff ? <FiVideoOff className="w-6 h-6" /> : <FiVideo className="w-6 h-6" />}
                  </button>
                  
                  <div className="w-[1px] h-10 bg-slate-700 mx-2" />

                  <button 
                    onClick={handleNextQuestion}
                    className="bg-white text-slate-900 font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-slate-100 transition-all active:scale-95"
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}
                    <HiOutlineArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleSubmitInterview}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black transition-all active:scale-95"
                  >
                    <FiPhone className="w-5 h-5" />
                    End Call
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="relative w-32 h-32 mx-auto mb-12">
                <div className="absolute inset-0 border-8 border-sky-500/10 rounded-full" />
                <div className="absolute inset-0 border-8 border-sky-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-4xl font-black mb-4">Neural Evaluation in Progress</h2>
              <p className="text-slate-400 text-lg">Synchronizing your responses with the AI Feedback Matrix...</p>
            </motion.div>
          )}

          {step === 'results' && feedback && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700 text-center">
                <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl shadow-sky-500/20">
                  {feedback.overallScore}
                </div>
                <h2 className="text-4xl font-black mb-4">Interview Summary</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                  {feedback.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <HiOutlineBolt className="text-amber-500" /> Key Improvements
                  </h3>
                  {feedback.improvements.map((imp, i) => (
                    <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-slate-300">{imp}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <HiOutlineChatBubbleLeftRight className="text-sky-500" /> Per-Question Analysis
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {feedback.feedbacks.map((item, i) => (
                      <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sky-500 text-xs font-black uppercase">Question {i+1}</span>
                          <span className="bg-slate-700 px-3 py-1 rounded-lg text-sm font-bold">{item.score}/10</span>
                        </div>
                        <h4 className="font-bold mb-3">{item.question}</h4>
                        <div className="p-4 bg-slate-900/50 rounded-xl text-sm text-slate-400 italic">
                          "{item.feedback}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setStep('landing')}
                  className="bg-slate-100 text-slate-900 font-black px-10 py-5 rounded-2xl flex items-center gap-3 hover:bg-white transition-all shadow-xl"
                >
                  <HiOutlineCheckCircle className="w-6 h-6" />
                  Exit Meeting Room
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MockInterview;
