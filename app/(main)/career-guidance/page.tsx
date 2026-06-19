"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, TrendingUp, Map, IndianRupee, ChevronRight, ChevronLeft, 
  CheckCircle, Loader2, GraduationCap, Stethoscope, HeartPulse, 
  Briefcase, Code, Microscope, FlaskConical, Building2, ArrowRight,
  BarChart3, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENT_QUESTIONS } from "@/lib/data";

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
  {
    stream: "Nursing",
    icon: HeartPulse,
    color: "rose",
    steps: [
      { title: "Class 10+2", desc: "PCB with 45%+ marks", duration: "2 Years" },
      { title: "Entrance", desc: "College-specific or state exam", duration: "3 Months" },
      { title: "B.Sc Nursing", desc: "4-year nursing degree", duration: "4 Years" },
      { title: "Registration", desc: "State Nursing Council", duration: "3 Months" },
      { title: "Specialization", desc: "M.Sc Nursing or certifications", duration: "2 Years" },
    ],
    salary: { entry: "3-5 LPA", mid: "6-12 LPA", senior: "15-30 LPA" },
    topColleges: ["AIIMS Nursing", "CMC Vellore", "State Nursing Colleges"],
  },
  {
    stream: "Management",
    icon: Briefcase,
    color: "amber",
    steps: [
      { title: "Class 10+2", desc: "Any stream, 50%+ marks", duration: "2 Years" },
      { title: "BBA/BBM", desc: "Bachelor's in Business", duration: "3 Years" },
      { title: "Entrance", desc: "CAT/MAT/XAT/CMAT", duration: "1 Year Prep" },
      { title: "MBA", desc: "Master's in Business Admin", duration: "2 Years" },
      { title: "Leadership", desc: "Managerial positions", duration: "Ongoing" },
    ],
    salary: { entry: "3-5 LPA", mid: "7-15 LPA", senior: "20-40 LPA" },
    topColleges: ["IIMs", "XLRI", "ISB", "Top B-Schools"],
  },
];

const salaryData = [
  { course: "B.Tech CSE", entry: 5, mid: 12, senior: 30 },
  { course: "MBBS", entry: 8, mid: 18, senior: 45 },
  { course: "B.Sc Nursing", entry: 4, mid: 9, senior: 20 },
  { course: "MBA", entry: 6, mid: 15, senior: 35 },
  { course: "B.Pharm", entry: 4, mid: 8, senior: 18 },
  { course: "BCA", entry: 4, mid: 10, senior: 25 },
];

export default function CareerGuidancePage() {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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

    // Calculate scores per stream
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

    // Find top stream
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
    setAssessmentStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 gradient-bg overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Career Guidance
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Not Sure What to Study?
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Take our free career assessment with Vidhyarthi Sewa and get personalized course recommendations 
              based on your interests, skills, and academic background.
            </p>
            <Button
              size="lg"
              className="pulse-glow text-lg"
              onClick={() => setAssessmentStarted(true)}
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Free Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Assessment Section */}
      {assessmentStarted && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              {!showResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
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

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                      <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!answers[currentQ.id] || isCalculating}
                        className="pulse-glow"
                      >
                        {isCalculating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : currentQuestion === ASSESSMENT_QUESTIONS.length - 1 ? (
                          <>
                            Get Results
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 lg:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-10 h-10 text-amber-600" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                    Your Recommended Career Path
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-bold text-lg mb-6">
                    {result?.stream}
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                    {Object.entries(result?.allScores || {}).map(([stream, score]) => (
                      <div key={stream} className="bg-slate-50 rounded-lg p-3">
                        <div className="text-sm text-slate-500">{stream}</div>
                        <div className="text-lg font-bold text-slate-900">{score as number}%</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      className="pulse-glow"
                      onClick={() => {
                        const el = document.getElementById("counseling-form");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Book Counseling
                    </Button>
                    <Button variant="outline" size="lg" onClick={resetAssessment}>
                      Retake Assessment
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Industry Trends */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Market Insights
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Industry Trends & Salary Insights
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Data-driven insights to help you make informed career decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Salary Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-500" />
                Salary Comparison (LPA)
              </h3>
              <div className="space-y-4">
                {salaryData.map((item, idx) => (
                  <div key={item.course}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{item.course}</span>
                    </div>
                    <div className="flex gap-1 h-8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.entry / 10) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="bg-blue-200 rounded-l-lg flex items-center justify-center text-xs font-medium text-blue-800"
                      >
                        {item.entry}
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.mid / 20) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                        className="bg-amber-200 flex items-center justify-center text-xs font-medium text-amber-800"
                      >
                        {item.mid}
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.senior / 50) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.4 }}
                        className="bg-emerald-200 rounded-r-lg flex items-center justify-center text-xs font-medium text-emerald-800"
                      >
                        {item.senior}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-200 rounded" />
                  <span className="text-slate-500">Entry</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-amber-200 rounded" />
                  <span className="text-slate-500">Mid (5yr)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-emerald-200 rounded" />
                  <span className="text-slate-500">Senior (10yr)</span>
                </div>
              </div>
            </motion.div>

            {/* Fastest Growing Careers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Fastest Growing Careers in India
              </h3>
              <div className="space-y-4">
                {[
                  { career: "AI/ML Engineer", growth: "45%", salary: "15-50 LPA" },
                  { career: "Data Scientist", growth: "38%", salary: "12-40 LPA" },
                  { career: "Cloud Architect", growth: "35%", salary: "15-45 LPA" },
                  { career: "Cybersecurity Expert", growth: "32%", salary: "10-35 LPA" },
                  { career: "Healthcare Administrator", growth: "28%", salary: "8-25 LPA" },
                  { career: "Digital Marketing Manager", growth: "25%", salary: "6-20 LPA" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.career}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{item.career}</div>
                      <div className="text-sm text-slate-500">Avg: {item.salary}</div>
                    </div>
                    <Badge variant="success" className="shrink-0">+{item.growth}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Roadmaps */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              <Map className="w-4 h-4" />
              Roadmaps
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Career Roadmaps
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Clear step-by-step paths for each career stream from education to employment.
            </p>
          </motion.div>

          <div className="space-y-12">
            {careerRoadmaps.map((roadmap, index) => {
              const Icon = roadmap.icon;
              return (
                <motion.div
                  key={roadmap.stream}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-xl bg-${roadmap.color}-50 flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 text-${roadmap.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{roadmap.stream}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-sm text-slate-500">Entry: {roadmap.salary.entry}</span>
                        <span className="text-sm text-slate-500">Mid: {roadmap.salary.mid}</span>
                        <span className="text-sm text-slate-500">Senior: {roadmap.salary.senior}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-slate-200" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {roadmap.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative">
                          <div className={`w-16 h-16 rounded-full bg-${roadmap.color}-100 flex items-center justify-center mx-auto mb-3 relative z-10`}>
                            <span className={`text-lg font-bold text-${roadmap.color}-600`}>{stepIdx + 1}</span>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 text-sm mb-1">{step.title}</div>
                            <div className="text-xs text-slate-500 mb-1">{step.desc}</div>
                            <Badge variant="secondary" className="text-xs">{step.duration}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <span className="text-sm text-slate-500">Top Colleges: </span>
                    {roadmap.topColleges.map((college, i) => (
                      <span key={college} className="text-sm text-slate-700">
                        {college}{i < roadmap.topColleges.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Personalized Career Guidance
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Our expert counselors will help you choose the perfect career path based on your unique profile.
            </p>
            <Button
              size="lg"
              className="pulse-glow text-lg"
              onClick={() => {
                const el = document.getElementById("counseling-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Book Free Counseling
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
