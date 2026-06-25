"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, TrendingUp, Map, IndianRupee, ChevronRight, ChevronLeft, 
  CheckCircle, Loader2, GraduationCap, Stethoscope, HeartPulse, 
  Briefcase, Code, Microscope, FlaskConical, Building2, ArrowRight,
  BarChart3, Lightbulb, Clock, Users, Laptop, Coffee, Shield, Target,
  Filter, MapPin, Calculator, Search, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ASSESSMENT_QUESTIONS } from "@/lib/data";
import { useRouter } from 'next/navigation';

// --- DUMMY DATA FOR NEW FEATURES ---

const dayInTheLife = [
  {
    id: "tech",
    title: "Software Engineer",
    icon: Code,
    color: "blue",
    timeline: [
      { time: "09:30 AM", task: "Daily Standup Meeting with Team", icon: Users },
      { time: "10:00 AM", task: "Deep Work: Coding & Problem Solving", icon: Laptop },
      { time: "01:00 PM", task: "Lunch Break & Tech Blogs", icon: Coffee },
      { time: "02:30 PM", task: "Code Review & Bug Fixing", icon: Shield },
      { time: "05:00 PM", task: "Sprint Planning & Wrap Up", icon: Target },
    ],
    superpowers: ["Logical Thinking", "Patience", "Continuous Learning"]
  },
  {
    id: "med",
    title: "Medical Resident",
    icon: Stethoscope,
    color: "emerald",
    timeline: [
      { time: "07:30 AM", task: "Morning Ward Rounds", icon: Users },
      { time: "10:00 AM", task: "Patient Consultations & Diagnostics", icon: Microscope },
      { time: "01:30 PM", task: "Quick Lunch in Cafeteria", icon: Coffee },
      { time: "02:00 PM", task: "Assisting in Procedures / OPD", icon: HeartPulse },
      { time: "06:00 PM", task: "Updating Patient Charts", icon: Shield },
    ],
    superpowers: ["Empathy", "Stamina", "Critical Decision Making"]
  },
  {
    id: "biz",
    title: "Marketing Manager",
    icon: Briefcase,
    color: "amber",
    timeline: [
      { time: "09:00 AM", task: "Review Campaign Analytics", icon: BarChart3 },
      { time: "10:30 AM", task: "Client Pitch & Strategy Meeting", icon: Users },
      { time: "01:00 PM", task: "Networking Lunch", icon: Coffee },
      { time: "02:30 PM", task: "Creative Review with Design Team", icon: Lightbulb },
      { time: "05:30 PM", task: "Budget Allocation & Reporting", icon: Target },
    ],
    superpowers: ["Communication", "Creativity", "Data Analysis"]
  }
];

const mockColleges = [
  { id: 1, name: "RV College of Engineering", stream: "Engineering", budget: "10L - 15L", location: "Bangalore", rating: 4.8 },
  { id: 2, name: "BMS College of Engineering", stream: "Engineering", budget: "5L - 10L", location: "Bangalore", rating: 4.7 },
  { id: 3, name: "Kasturba Medical College", stream: "Medical", budget: "15L+", location: "Rest of Karnataka", rating: 4.9 },
  { id: 4, name: "MS Ramaiah Medical College", stream: "Medical", budget: "15L+", location: "Bangalore", rating: 4.8 },
  { id: 5, name: "Christ University", stream: "Management", budget: "5L - 10L", location: "Bangalore", rating: 4.6 },
  { id: 6, name: "TAPMI Manipal", stream: "Management", budget: "15L+", location: "Rest of Karnataka", rating: 4.7 },
];

const careerRoadmaps = [
  {
    stream: "Engineering",
    icon: Code,
    color: "blue",
    steps: [
      { title: "Class 10+2", desc: "PCM with 50%+ marks", duration: "2 Years" },
      { title: "Entrance Exam", desc: "JEE Main/Advanced or State CET", duration: "6 Months" },
      { title: "B.Tech", desc: "4-year engineering degree", duration: "4 Years" },
      { title: "Internship", desc: "Industry training & projects", duration: "6 Months" },
      { title: "Placement", desc: "Campus recruitment", duration: "Ongoing" },
    ],
    salary: { entry: "4-6 LPA", mid: "8-15 LPA", senior: "20-40 LPA" },
    topColleges: ["IITs", "NITs", "BITS", "State Engineering Colleges"],
  },
  {
    stream: "Medical",
    icon: Stethoscope,
    color: "emerald",
    steps: [
      { title: "Class 10+2", desc: "PCB with 50%+ marks", duration: "2 Years" },
      { title: "NEET Exam", desc: "National Eligibility Test", duration: "1 Year Prep" },
      { title: "MBBS", desc: "5.5 years medical degree", duration: "5.5 Years" },
      { title: "Internship", desc: "Hospital rotation", duration: "1 Year" },
      { title: "Specialization", desc: "MD/MS/Diploma", duration: "3 Years" },
    ],
    salary: { entry: "6-10 LPA", mid: "12-25 LPA", senior: "30-60 LPA" },
    topColleges: ["AIIMS", "JIPMER", "State Medical Colleges", "Private Medical Colleges"],
  },
];

const salaryData = [
  { course: "B.Tech CSE", entry: 5, mid: 12, senior: 30 },
  { course: "MBBS", entry: 8, mid: 18, senior: 45 },
  { course: "B.Sc Nursing", entry: 4, mid: 9, senior: 20 },
  { course: "MBA", entry: 6, mid: 15, senior: 35 },
];

// --- MAIN COMPONENT ---

export default function CareerGuidancePage() {
  const router = useRouter();
  // Assessment State
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Day in the Life State
  const [activeDay, setActiveDay] = useState(dayInTheLife[0].id);

  // Matcher State
  const [filterStream, setFilterStream] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  
  // ROI State
  const [roiFee, setRoiFee] = useState(8); // Lakhs
  const [roiSalary, setRoiSalary] = useState(6); // Lakhs
  const paybackYears = (roiFee / (roiSalary * 0.4)).toFixed(1); // Assuming 40% of salary used for payback

  const handleAnswer = (questionId: string, optionText: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionText }));
  };

  const handleNext = () => {
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  };

  const calculateResult = () => {
    setIsCalculating(true);
    const scores: Record<string, number> = {};
    ASSESSMENT_QUESTIONS.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        const option = q.options.find(o => o.text === answer);
        if (option) {
          scores[option.stream] = (scores[option.stream] || 0) + option.score;
        }
      }
    });

    const topStream = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

    setTimeout(() => {
      setResult({
        stream: topStream?.[0] || "Engineering",
        score: topStream?.[1] || 0,
        allScores: scores,
      });
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setAssessmentStarted(true);
  };

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  const activeDayData = dayInTheLife.find(d => d.id === activeDay)!;

  const filteredColleges = mockColleges.filter(c => {
    if (filterStream !== "All" && c.stream !== filterStream) return false;
    if (filterLocation !== "All" && c.location !== filterLocation) return false;
    return true;
  });

  return (
    <div className="pt-20">
      
      {/* 1. MODERN HERO SECTION - Updated to deep blue theme */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#3a506b] overflow-hidden">
        
        {/* Deep steel blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c4159]/95 via-[#466282]/85 to-[#3a506b]/95 z-0 pointer-events-none" />

        {/* Giant Background Text - Toned down for dark mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none overflow-hidden">
          <h1 className="text-[clamp(4rem,16vw,12rem)] font-black text-white/5 leading-none tracking-tighter whitespace-nowrap">
            Unsure?
          </h1>
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Top Badge - Updated to transparent glass with gold text */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#FDB813] font-bold mb-6 shadow-sm border border-white/20">
              <Sparkles className="w-4 h-4" />
              Smart Career Guidance
            </div>
            
            {/* Headings - Updated text colors */}
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Find Your Perfect Path
            </h2>
            
            <p className="text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              Take our interactive assessment, explore 'day in the life' previews, and calculate your ROI to make a confident career choice.
            </p>

            {/* Button - Updated to solid gold */}
            <Button 
              size="lg" 
              className="rounded-full bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 px-8 h-14 text-lg font-bold shadow-[0_15px_30px_-10px_rgba(253,184,19,0.5)] transition-all hover:scale-105"
              onClick={() => {
                setAssessmentStarted(true);
                setTimeout(() => {
                  document.getElementById("assessment-container")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Free Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ASSESSMENT TOOL */}
      <div id="assessment-container">
        {assessmentStarted && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="max-w-2xl mx-auto">
                {!showResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
                  >
                    {/* Progress */}
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}
                        </span>
                        <span className="text-sm font-bold text-amber-600">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <div className="p-6 lg:p-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQuestion}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-bold text-slate-900 mb-6">
                            {currentQ.question}
                          </h3>
                          <div className="space-y-3">
                            {currentQ.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(currentQ.id, option.text)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                  answers[currentQ.id] === option.text
                                    ? "border-amber-500 bg-amber-50 text-amber-900"
                                    : "border-slate-100 hover:border-amber-200 hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    answers[currentQ.id] === option.text
                                      ? "border-amber-500 bg-amber-500"
                                      : "border-slate-300"
                                  }`}>
                                    {answers[currentQ.id] === option.text && (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <span className="font-medium">{option.text}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation - Button color updated to gold theme */}
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                        <Button variant="outline" onClick={handlePrev} disabled={currentQuestion === 0}>
                          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        <Button 
                          onClick={handleNext} 
                          disabled={!answers[currentQ.id] || isCalculating} 
                          className="bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 font-bold"
                        >
                          {isCalculating ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                          ) : currentQuestion === ASSESSMENT_QUESTIONS.length - 1 ? (
                            <>Get Results <CheckCircle className="w-4 h-4 ml-2" /></>
                          ) : (
                            <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-12 text-center relative overflow-hidden"
                  >
                    {/* Gradient updated to match gold theme */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-[#FDB813]" />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="w-10 h-10 text-amber-600" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                      Your Recommended Path
                    </h2>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-50 text-amber-700 font-bold text-2xl mb-8 border border-amber-200">
                      {result?.stream}
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                      {Object.entries(result?.allScores || {}).map(([stream, score]) => (
                        <div key={stream} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <div className="text-sm text-slate-500 mb-1">{stream}</div>
                          <div className="text-xl font-black text-slate-900">{score as number}% Match</div>
                        </div>
                      ))}
                    </div>

                    {/* Button colors updated to gold theme */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-[#FDB813] hover:bg-[#E5A300] text-slate-900 font-bold rounded-full" 
                        onClick={() => {
                          // Navigate to the home page and anchor to the form
                          router.push("/#counseling-form"); 
                        }}
                      >
                        Book Free Strategy Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full" 
                        onClick={resetAssessment}
                      >
                        Retake Assessment
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 3. DAY IN THE LIFE PREVIEW */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">A Day in the Life</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Peek behind the curtain to see what these careers actually look like on a daily basis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {dayInTheLife.map((career) => {
                const Icon = career.icon;
                const isActive = activeDay === career.id;
                return (
                  <button
                    key={career.id}
                    onClick={() => setActiveDay(career.id)}
                    // Active border updated to gold
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                      isActive ? "bg-white shadow-lg border-l-4 border-[#FDB813]" : "hover:bg-slate-100 border-l-4 border-transparent"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isActive ? `bg-${career.color}-100 text-${career.color}-600` : 'bg-slate-200 text-slate-500'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{career.title}</h4>
                      <p className="text-xs text-slate-500">View timeline &rarr;</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Timeline View */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDayData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Clock className={`text-${activeDayData.color}-500 w-6 h-6`} /> 
                    Typical Schedule
                  </h3>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent mb-10">
                    {activeDayData.timeline.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-${activeDayData.color}-100 text-${activeDayData.color}-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-bold text-${activeDayData.color}-600 text-sm`}>{item.time}</span>
                            </div>
                            <div className="text-slate-700 font-medium">{item.task}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Required Superpowers</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDayData.superpowers.map(power => (
                        <Badge key={power} variant="secondary" className="bg-white">{power}</Badge>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREER ROADMAPS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">The Education Roadmaps</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Clear step-by-step paths from the classroom to the corporate world.</p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {careerRoadmaps.map((roadmap, index) => {
              const Icon = roadmap.icon;
              return (
                <motion.div
                  key={roadmap.stream}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-3xl p-6 lg:p-10 border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-${roadmap.color}-100 flex items-center justify-center shadow-inner`}>
                      <Icon className={`w-8 h-8 text-${roadmap.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{roadmap.stream} Journey</h3>
                      <p className="text-slate-500">From 10+2 to Senior Level Professional</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-slate-200 rounded-full" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                      {roadmap.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative bg-white p-5 rounded-2xl border border-slate-100 shadow-sm z-10 mt-4 lg:mt-0">
                          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-${roadmap.color}-500 border-4 border-slate-50 flex items-center justify-center shadow-sm`}>
                            <span className="text-white font-bold text-sm">{stepIdx + 1}</span>
                          </div>
                          <div className="text-center pt-4">
                            <div className="font-bold text-slate-900 text-sm mb-1">{step.title}</div>
                            <div className="text-xs text-slate-500 mb-3">{step.desc}</div>
                            <Badge variant="outline" className="text-xs bg-slate-50">{step.duration}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COURSE-TO-COLLEGE MATCHER */}
      {/* Background color neutralized to fit new theme gracefully */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-white/60">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 border-b border-slate-100 pb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  {/* Icon updated to gold */}
                  <Filter className="text-[#FDB813] w-8 h-8" /> Smart College Matcher
                </h2>
                <p className="text-slate-500">Filter through our partner colleges to find your perfect match.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <select 
                  // Focus ring updated to gold
                  className="flex-1 lg:w-48 h-12 rounded-xl border border-slate-200 px-4 bg-slate-50 font-medium text-slate-700 outline-none focus:border-[#FDB813]"
                  value={filterStream}
                  onChange={(e) => setFilterStream(e.target.value)}
                >
                  <option value="All">All Streams</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medical">Medical</option>
                  <option value="Management">Management</option>
                </select>
                
                <select 
                  // Focus ring updated to gold
                  className="flex-1 lg:w-48 h-12 rounded-xl border border-slate-200 px-4 bg-slate-50 font-medium text-slate-700 outline-none focus:border-[#FDB813]"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Rest of Karnataka">Rest of Karnataka</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredColleges.map((college) => (
                  <motion.div 
                    key={college.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300">{college.stream}</Badge>
                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        ⭐ {college.rating}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{college.name}</h4>
                    <div className="space-y-2 mt-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {college.location}</div>
                      <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4"/> Budget: {college.budget}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredColleges.length === 0 && (
              <div className="text-center py-10 text-slate-500 flex flex-col items-center">
                <Search className="w-12 h-12 mb-3 opacity-20" />
                No colleges match your exact criteria. Contact us for private recommendations!
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 6. ROI CALCULATOR & INDUSTRY TRENDS */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden"
            >
              {/* Blur accent updated to gold */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDB813]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-3 relative z-10">
                {/* Icon updated to gold */}
                <Calculator className="text-[#FDB813]" /> Education ROI Calculator
              </h3>
              <p className="text-slate-400 mb-8 relative z-10 text-sm">See how long it takes to recover your investment based on entry-level salaries.</p>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Total Course Fees</label>
                    <span className="font-bold text-white">₹{roiFee} Lakhs</span>
                  </div>
                  <input 
                    type="range" min="2" max="50" step="1" 
                    value={roiFee} onChange={(e) => setRoiFee(Number(e.target.value))}
                    // Slider accent updated to gold
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FDB813]"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Expected Starting Salary</label>
                    <span className="font-bold text-white">₹{roiSalary} LPA</span>
                  </div>
                  <input 
                    type="range" min="3" max="25" step="1" 
                    value={roiSalary} onChange={(e) => setRoiSalary(Number(e.target.value))}
                    // Slider accent updated to gold
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FDB813]"
                  />
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <div className="text-sm text-slate-300 mb-1">Estimated Payback Period</div>
                  {/* Results text updated to gold */}
                  <div className="text-4xl font-black text-[#FDB813]">{paybackYears} Years</div>
                  <div className="text-xs text-slate-400 mt-2">*Assuming 40% of salary is saved for repayment</div>
                </div>
              </div>
            </motion.div>

            {/* Salary Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <BarChart3 className="text-amber-500" /> Salary Trajectories
              </h3>
              <div className="space-y-5">
                {salaryData.map((item, idx) => (
                  <div key={item.course}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700">{item.course}</span>
                    </div>
                    <div className="flex gap-1 h-10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.entry / 10) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="bg-blue-100 rounded-l-xl flex items-center justify-center text-xs font-bold text-blue-800"
                      >
                        {item.entry}L
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.mid / 20) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                        className="bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800"
                      >
                        {item.mid}L
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.senior / 50) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.4 }}
                        className="bg-emerald-100 rounded-r-xl flex items-center justify-center text-xs font-bold text-emerald-800"
                      >
                        {item.senior}L
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6 text-xs justify-center pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-200 rounded" /> Entry Level</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-200 rounded" /> Mid (5yr)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-200 rounded" /> Senior (10yr+)</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      
    </div>
  );
}