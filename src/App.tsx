/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  RefreshCw,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

interface Lab {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

const GRADE_POINTS = [
  { label: 'O (10)', value: 10 },
  { label: 'A+ (9)', value: 9 },
  { label: 'A (8)', value: 8 },
  { label: 'B+ (7)', value: 7 },
  { label: 'B (6)', value: 6 },
  { label: 'C (5)', value: 5 },
  { label: 'P (4)', value: 4 },
  { label: 'F (0)', value: 0 },
];

export default function App() {
  const [step, setStep] = useState<'setup' | 'calculator' | 'result'>('setup');
  const [prevCgpa, setPrevCgpa] = useState<string>('');
  const [semestersCompleted, setSemestersCompleted] = useState<string>('');
  const [numSubjects, setNumSubjects] = useState<string>('5');
  const [numLabs, setNumLabs] = useState<string>('2');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', credits: 3, gradePoint: 10 }
  ]);
  const [labs, setLabs] = useState<Lab[]>([
    { id: '1', name: '', credits: 2, gradePoint: 10 }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: '', 
      credits: 3, 
      gradePoint: 10 
    }]);
  };

  const addLab = () => {
    setLabs([...labs, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: '', 
      credits: 2, 
      gradePoint: 10 
    }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const removeLab = (id: string) => {
    if (labs.length > 0) {
      setLabs(labs.filter(l => l.id !== id));
    }
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const updateLab = (id: string, updates: Partial<Lab>) => {
    setLabs(labs.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const stats = useMemo(() => {
    const currentTotalCredits = subjects.reduce((acc, s) => acc + s.credits, 0) + labs.reduce((acc, l) => acc + l.credits, 0);
    const currentTotalPoints = subjects.reduce((acc, s) => acc + (s.credits * s.gradePoint), 0) + labs.reduce((acc, l) => acc + (l.credits * l.gradePoint), 0);
    const sgpa = currentTotalCredits > 0 ? currentTotalPoints / currentTotalCredits : 0;

    const pCgpa = parseFloat(prevCgpa) || 0;
    const pCredits = (parseInt(semestersCompleted) || 0) * 22;

    const totalCredits = pCredits + currentTotalCredits;
    const totalPoints = (pCgpa * pCredits) + currentTotalPoints;
    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : sgpa;

    return { sgpa, cgpa, currentTotalCredits, totalCredits };
  }, [subjects, labs, prevCgpa, semestersCompleted]);

  const getEncouragement = (sgpa: number) => {
    const quotes = {
      topper: [
        "Dei un CGPA paatha calculator kuda jealous da 😭",
        "Internal mark venuma? Staff unga peru kekka maataanga 😂",
        "Nee padikara time la na Netflix login panren 😌",
        "Exam ku padikka maaten nu sollitu rank vangura type 😤",
        "Un notes dhaan namma department property",
        "Placement company HR: 'Sir neenga enga office la work pannunga'",
        "Viva la staff ku doubt varum 😂",
        "Nee fail aana news la varum da",
        "College la unofficial HOD 😎",
        "CGPA ku separate locker venum pola 🔥"
      ],
      smart: [
        "Dei nee safe zone student da 😂",
        "Padippu irukku… aana over show illa",
        "Last week padichu 8.5 vangura magic",
        "Internal mark unga life insurance 😌",
        "Placement ku tension illa confident smile",
        "Topper friend use panra strategy master",
        "Backlog la touch panna maata",
        "Group study la attendance strong",
        "CGPA solid… effort semi-solid 😂",
        "Neenga dhaan balance batch"
      ],
      survival: [
        "Pass aana podhum da nu philosophy",
        "Grace mark unga guardian angel",
        "Exam ku one night war mode",
        "Internal mark illana life dark",
        "Result varaikum tension full",
        "Arrear illa na celebration",
        "Unit 1 dhaan strong area 😂",
        "Attendance manage pannra engineer",
        "Parents: 'seri parava illa' batch",
        "Survival expert certified"
      ],
      border: [
        "Hall ticket print panna bayam",
        "Supplementary form permanent resident",
        "Temple visit before result mandatory",
        "Internal mark ku daily follow up",
        "Grace mark vandha treat confirm",
        "Marksheet open panna heart beat increase",
        "Unit 5 skip panra tradition",
        "Placement la motivational speech kekkara level",
        "Backlog count secret ah vechurupom",
        "Improve next sem nu 3 years ah solrom 😭"
      ],
      roast: [
        "CGPA ah ketta network problem nu solluva",
        "Result day la mobile off mode",
        "Arrear subject oda emotional bonding",
        "Exam hall la subject name doubt",
        "Parents ku 'system error' explanation",
        "Placement la attendance only",
        "Internal mark ku staff kitte friendship",
        "Marksheet open panna suspense movie",
        "Business idea ready ah vechuruka?",
        "College mudichaa podhum da life set 😂"
      ]
    };

    let category: keyof typeof quotes;
    let icon: React.ReactNode;
    let color: string;

    if (sgpa >= 9.0) {
      category = 'topper';
      icon = <Award className="text-yellow-500" size={64} />;
      color = "text-yellow-500";
    } else if (sgpa >= 8.0) {
      category = 'smart';
      icon = <TrendingUp className="text-cyan-primary" size={64} />;
      color = "text-cyan-primary";
    } else if (sgpa >= 7.0) {
      category = 'survival';
      icon = <Zap className="text-orange-500" size={64} />;
      color = "text-orange-500";
    } else if (sgpa >= 6.0) {
      category = 'border';
      icon = <Target className="text-red-400" size={64} />;
      color = "text-red-400";
    } else {
      category = 'roast';
      icon = <Sparkles className="text-gray-400" size={64} />;
      color = "text-gray-400";
    }

    const randomQuote = quotes[category][Math.floor(Math.random() * quotes[category].length)];
    return { text: randomQuote, icon, color };
  };

  const reset = () => {
    setStep('setup');
    setPrevCgpa('');
    setSemestersCompleted('');
    setNumSubjects('5');
    setNumLabs('2');
    setSubjects([{ id: '1', name: '', credits: 3, gradePoint: 10 }]);
    setLabs([{ id: '1', name: '', credits: 2, gradePoint: 10 }]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="web-container py-8 flex items-center justify-between border-b border-black/5">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={reset}>
          <div className="w-14 h-14 bg-black rounded-[1.25rem] flex items-center justify-center group-hover:bg-cyan-primary transition-colors duration-500">
            <GraduationCap className="text-white" size={32} />
          </div>
          <div>
            <span className="sub-label">Academic Intelligence</span>
            <h1 className="text-2xl font-black tracking-tighter">GRADEMASTER.IO</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-cyan-primary transition-colors">Methodology</a>
          <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-cyan-primary transition-colors">Resources</a>
          {step !== 'setup' && (
            <button onClick={reset} className="btn-secondary py-3 px-6 text-sm">
              <RefreshCw size={16} /> Reset
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1 web-container py-12 lg:py-24">
        <AnimatePresence mode="wait">
          {step === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="grid lg:grid-cols-2 gap-24 items-center"
            >
              <div className="space-y-12">
                <div className="space-y-6">
                  <span className="sub-label">Welcome Scholar</span>
                  <h2 className="hero-text">Unlock your <span className="text-cyan-primary">Academic</span> Potential.</h2>
                  <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                    A sophisticated platform designed for modern students to track, analyze, and optimize their academic performance with precision.
                  </p>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-light flex items-center justify-center text-cyan-dark">
                      <Zap size={20} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Instant SGPA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-light flex items-center justify-center text-cyan-dark">
                      <Target size={20} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">CGPA Projection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-light flex items-center justify-center text-cyan-dark">
                      <Sparkles size={20} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Smart Insights</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-12 space-y-10">
                <div className="grid gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Previous CGPA</label>
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="8.50"
                      className="input-field"
                      value={prevCgpa}
                      onChange={(e) => setPrevCgpa(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Semesters Completed</label>
                    <input 
                      type="number" 
                      placeholder="2"
                      className="input-field"
                      value={semestersCompleted}
                      onChange={(e) => setSemestersCompleted(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Subjects this Semester</label>
                    <input 
                      type="number" 
                      placeholder="5"
                      className="input-field"
                      value={numSubjects}
                      onChange={(e) => setNumSubjects(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-gray-400">Labs this Semester</label>
                    <input 
                      type="number" 
                      placeholder="2"
                      className="input-field"
                      value={numLabs}
                      onChange={(e) => setNumLabs(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const sCount = Math.max(1, Math.min(20, parseInt(numSubjects) || 1));
                    const lCount = Math.max(0, Math.min(10, parseInt(numLabs) || 0));
                    
                    const initialSubjects = Array.from({ length: sCount }, (_, i) => ({
                      id: Math.random().toString(36).substr(2, 9),
                      name: '',
                      credits: 3,
                      gradePoint: 10
                    }));

                    const initialLabs = Array.from({ length: lCount }, (_, i) => ({
                      id: Math.random().toString(36).substr(2, 9),
                      name: '',
                      credits: 2,
                      gradePoint: 10
                    }));

                    setSubjects(initialSubjects);
                    setLabs(initialLabs);
                    setStep('calculator');
                  }}
                  className="btn-primary w-full group"
                >
                  Initialize Calculator <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                  <button onClick={() => setStep('setup')} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    <ArrowLeft size={16} /> Back to Setup
                  </button>
                  <h2 className="text-5xl font-black tracking-tighter uppercase">Current Semester</h2>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={addSubject} className="btn-secondary py-4">
                    <Plus size={20} /> Subject
                  </button>
                  <button onClick={addLab} className="btn-secondary py-4">
                    <Plus size={20} /> Lab
                  </button>
                  <button onClick={() => setStep('result')} className="btn-primary py-4">
                    <Calculator size={20} /> Results
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {subjects.map((subject, index) => (
                  <motion.div 
                    layout
                    key={subject.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 space-y-8 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="sub-label">Subject {index + 1}</span>
                      {subjects.length > 1 && (
                        <button 
                          onClick={() => removeSubject(subject.id)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Credits</label>
                        <input 
                          type="number"
                          className="input-field py-3 text-base"
                          value={subject.credits}
                          onChange={(e) => updateSubject(subject.id, { credits: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Grade</label>
                        <select 
                          className="input-field py-3 text-base appearance-none cursor-pointer"
                          value={subject.gradePoint}
                          onChange={(e) => updateSubject(subject.id, { gradePoint: parseInt(e.target.value) })}
                        >
                          {GRADE_POINTS.map(gp => (
                            <option key={gp.value} value={gp.value}>{gp.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {labs.map((lab, index) => (
                  <motion.div 
                    layout
                    key={lab.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 space-y-8 relative group border-t-4 border-cyan-primary/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="sub-label text-cyan-dark">Lab {index + 1}</span>
                      <button 
                        onClick={() => removeLab(lab.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Credits</label>
                        <input 
                          type="number"
                          className="input-field py-3 text-base"
                          value={lab.credits}
                          onChange={(e) => updateLab(lab.id, { credits: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Grade</label>
                        <select 
                          className="input-field py-3 text-base appearance-none cursor-pointer"
                          value={lab.gradePoint}
                          onChange={(e) => updateLab(lab.id, { gradePoint: parseInt(e.target.value) })}
                        >
                          {GRADE_POINTS.map(gp => (
                            <option key={gp.value} value={gp.value}>{gp.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="text-center space-y-6 max-w-2xl mx-auto">
                <span className="sub-label">Performance Analysis</span>
                <h2 className="text-6xl font-black tracking-tighter uppercase">Academic Summary</h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-b-8 border-cyan-primary">
                  <span className="sub-label">Semester SGPA</span>
                  <p className="text-8xl font-black tracking-tighter text-cyan-primary">{stats.sgpa.toFixed(2)}</p>
                </div>
                
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-b-8 border-black">
                  <span className="sub-label">Cumulative CGPA</span>
                  <p className="text-8xl font-black tracking-tighter">{stats.cgpa.toFixed(2)}</p>
                </div>

                <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-8 bg-black text-white relative overflow-hidden group">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {getEncouragement(stats.sgpa).icon}
                  </motion.div>
                  <div className="space-y-4 relative z-10">
                    <span className={`text-xs font-black uppercase tracking-[0.3em] ${getEncouragement(stats.sgpa).color}`}>Vibe Check</span>
                    <p className="text-2xl font-black leading-tight tracking-tight italic">
                      "{getEncouragement(stats.sgpa).text}"
                    </p>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="glass-card p-12 space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Data Breakdown</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Previous CGPA</span>
                      <span className="text-xl font-black">{parseFloat(prevCgpa) || '0.00'}</span>
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Semesters Completed</span>
                      <span className="text-xl font-black">{semestersCompleted || '0'}</span>
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Total Credits (Est.)</span>
                      <span className="text-xl font-black">{stats.totalCredits}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <button 
                    onClick={() => setStep('calculator')}
                    className="btn-primary w-full h-full py-12"
                  >
                    <ArrowLeft size={24} /> Refine Course Data
                  </button>
                  <button 
                    onClick={reset}
                    className="btn-secondary w-full h-full py-12"
                  >
                    <RefreshCw size={24} /> New Calculation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="web-container py-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">© 2024 GradeMaster Intelligence Systems</p>
        <div className="flex gap-8">
          <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-cyan-primary transition-colors">Privacy</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-cyan-primary transition-colors">Terms</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-cyan-primary transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
