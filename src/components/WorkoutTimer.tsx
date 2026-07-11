import React, { useState, useEffect, useRef } from 'react';
import { RESISTANCE_EXERCISES, ExerciseItem } from '../types';
import { Dumbbell, Play, Pause, RotateCcw, AlertTriangle, ChevronRight, CheckCircle2, Award, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import chairSquatDemo from '../assets/images/chair_squat_demo_1783758103687.jpg';
// @ts-ignore
import wallPushUpDemo from '../assets/images/wall_push_up_demo_1783758123342.jpg';
// @ts-ignore
import calfRaiseDemo from '../assets/images/calf_raise_demo_1783758434970.jpg';
// @ts-ignore
import legExtensionDemo from '../assets/images/leg_extension_demo_1783758446769.jpg';

export default function WorkoutTimer() {
  const [selectedId, setSelectedId] = useState<string>(RESISTANCE_EXERCISES[0].id);
  const [timeLeft, setTimeLeft] = useState<number>(RESISTANCE_EXERCISES[0].durationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [timerType, setTimerType] = useState<'work' | 'rest'>('work'); // work or rest timer
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedExercise = RESISTANCE_EXERCISES.find(e => e.id === selectedId) || RESISTANCE_EXERCISES[0];

  // Sync timer when exercise selection changes
  useEffect(() => {
    setIsRunning(false);
    setTimerType('work');
    setTimeLeft(selectedExercise.durationSeconds);
  }, [selectedId, selectedExercise]);

  // Audio synthesis helper for beeping
  const playBeep = (frequency: number, duration: number) => {
    if (!isSoundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Low volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by browser security policy:', e);
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            if (timerType === 'work') {
              playBeep(880, 0.4); // Higher pitch for finish work
              // Automatically switch to rest timer of 20 seconds
              setTimerType('rest');
              return 20; // 20 seconds rest
            } else {
              playBeep(523, 0.4); // Lower pitch for finish rest
              setTimerType('work');
              setIsRunning(false); // Stop running after rest is over
              return selectedExercise.durationSeconds;
            }
          }
          
          // Countdown alert beep during final 3 seconds
          if (prev <= 4 && prev > 1) {
            playBeep(440, 0.08);
          }
          
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timerType, selectedExercise, isSoundEnabled]);

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimerType('work');
    setTimeLeft(selectedExercise.durationSeconds);
  };

  // Log set completed
  const handleLogSet = (exerciseId: string) => {
    setCompletedSets(prev => {
      const current = prev[exerciseId] || 0;
      const targetStr = selectedExercise.sets.match(/\d+/)?.[0] || '3';
      const target = parseInt(targetStr, 10);
      
      if (current >= target) {
        // Reset count if clicked beyond target
        return { ...prev, [exerciseId]: 0 };
      }
      
      // Synthesize achievement noise
      playBeep(659, 0.15);
      setTimeout(() => playBeep(1046, 0.3), 150);
      
      return { ...prev, [exerciseId]: current + 1 };
    });
  };

  const currentCount = completedSets[selectedExercise.id] || 0;
  const targetStr = selectedExercise.sets.match(/\d+/)?.[0] || '3';
  const targetSets = parseInt(targetStr, 10);
  const isExerciseFullyCompleted = currentCount >= targetSets;

  // Calculate percentage for visual feedback
  const maxTimerDuration = timerType === 'work' ? selectedExercise.durationSeconds : 20;
  const timerPercentage = Math.round((timeLeft / maxTimerDuration) * 100);

  return (
    <div className="bg-gradient-to-b from-orange-50/50 via-white to-white rounded-3xl border-2 border-orange-100/90 p-6 md:p-8 shadow-sm" id="workout-timer-panel">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-xs flex-shrink-0 mt-0.5">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">居家簡易阻力訓練指南</h2>
            <p className="text-base text-slate-500 font-medium mt-1">每天 15 分鐘，免器材，鍛鍊核心大肌群，提升骨質密度與關節穩定</p>
          </div>
        </div>

        {/* Sound controls and status */}
        <button
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
            isSoundEnabled 
              ? 'border-orange-200 bg-orange-50/50 text-orange-800' 
              : 'border-slate-200 text-slate-500'
          }`}
          title={isSoundEnabled ? '靜音語音提示' : '開啟語音提示'}
        >
          {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          {isSoundEnabled ? '提示音：開' : '提示音：靜音'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="workout-grid">
        {/* Left column: Exercise picker list with nested interactive controls */}
        <div className="lg:col-span-8 space-y-3.5" id="exercise-list">
          <span className="text-base font-bold text-slate-400 uppercase tracking-wider block mb-1">四套抗肌少運動清單 (展開後可直接進行計時與紀錄)</span>
          {RESISTANCE_EXERCISES.map((ex, idx) => {
            const isSelected = ex.id === selectedId;
            const completedCount = completedSets[ex.id] || 0;
            const target = parseInt(ex.sets.match(/\d+/)?.[0] || '3', 10);
            const isDone = completedCount >= target;

            return (
              <div
                key={ex.id}
                onClick={() => setSelectedId(ex.id)}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-600 bg-orange-50/20 text-orange-950 shadow-xs ring-1 ring-orange-500/20'
                    : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-slate-50/50 hover:bg-slate-50'
                }`}
                id={`ex-btn-${ex.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-orange-600 text-white' : 'bg-slate-200/60 text-slate-600'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold truncate">{ex.name}</h3>
                      <p className="text-sm text-slate-400 mt-0.5 truncate">{ex.target.split('、')[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    {isDone ? (
                      <span className="text-emerald-600" title="已完成所有組數">
                        <CheckCircle2 className="w-5 h-5 fill-emerald-50" />
                      </span>
                    ) : completedCount > 0 ? (
                      <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full">
                        {completedCount}/{target}組
                      </span>
                    ) : (
                      <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform ${isSelected ? 'rotate-90 text-orange-500' : ''}`} />
                    )}
                  </div>
                </div>

                {/* Expanded Details Accordion */}
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden border-t border-orange-100/60 pt-3 text-base space-y-4 text-slate-800 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-2">
                        <p className="leading-relaxed">
                          <strong className="text-orange-700">🎯 訓練目標：</strong>
                          {ex.target}
                        </p>
                        <p className="leading-relaxed">
                          <strong className="text-orange-700">📋 建議：</strong>
                          {ex.reps} ‧ {ex.sets}
                        </p>
                        <div className="space-y-1">
                          <strong className="text-orange-700 block">👣 動作步驟：</strong>
                          <ol className="list-decimal pl-4.5 space-y-1 text-slate-700 leading-relaxed">
                            {ex.description.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Safety Guidelines - directly inside active item */}
                      <div className="bg-amber-50/50 border border-amber-100/85 rounded-2xl p-4 space-y-2">
                        <h4 className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" /> 運動安全指引 (請務必遵守)
                        </h4>
                        <ul className="space-y-1 text-sm md:text-base text-amber-950 leading-relaxed list-disc pl-4">
                          {ex.safetyTips.map((tip, tIdx) => (
                            <li key={tIdx}><strong>{tip.split('：')[0]}</strong>：{tip.split('：')[1]}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive Live Timer Panel - right below safety tips */}
                      <div className="bg-white border border-orange-100 rounded-2xl p-4 md:p-5 mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center" id="live-timer-widget">
                        
                        {/* Timer visual ring / display */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center">
                          <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-full border border-slate-150 shadow-xs" id="radial-timer-ring">
                            
                            {/* SVG circular progress */}
                            <svg className="absolute w-full h-full -rotate-90">
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                className="stroke-slate-100 fill-transparent"
                                strokeWidth="5"
                              />
                              <motion.circle
                                cx="56"
                                cy="56"
                                r="48"
                                className={`fill-transparent ${timerType === 'rest' ? 'stroke-emerald-500' : 'stroke-orange-500'}`}
                                strokeWidth="5"
                                strokeDasharray="301.6"
                                animate={{ strokeDashoffset: 301.6 - (301.6 * timerPercentage) / 100 }}
                                transition={{ ease: 'linear', duration: 1 }}
                              />
                            </svg>

                            <div className="text-center z-10">
                              <span className={`text-[10px] uppercase font-extrabold tracking-widest block ${timerType === 'rest' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                {timerType === 'rest' ? '休息時間' : '動作計時'}
                              </span>
                              <span className="text-2xl font-black text-slate-800 tabular-nums">
                                {timeLeft}
                              </span>
                              <span className="text-[10px] text-slate-400 block">秒 (sec)</span>
                            </div>
                          </div>
                        </div>

                        {/* Timer action controls & Logging */}
                        <div className="md:col-span-7 flex flex-col justify-center space-y-3.5">
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTogglePlay();
                              }}
                              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isRunning 
                                  ? 'bg-slate-700 hover:bg-slate-800' 
                                  : timerType === 'rest' 
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : 'bg-orange-600 hover:bg-orange-700'
                              }`}
                              id="btn-timer-play"
                            >
                              {isRunning ? (
                                <>
                                  <Pause className="w-4 h-4 fill-white animate-pulse" /> 暫停計時
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 fill-white" /> {timerType === 'rest' ? '開始休息' : '開始計時'}
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetTimer();
                              }}
                              className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                              title="重設計時"
                              id="btn-timer-reset"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Workout Progress Tracker & Logger */}
                          <div className="bg-slate-50/50 rounded-xl border border-slate-150 p-3 flex items-center justify-between" id="completed-sets-tracker">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`w-7.5 h-7.5 rounded-full flex flex-shrink-0 items-center justify-center ${
                                isExerciseFullyCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600 shadow-3xs'
                              }`}>
                                {isExerciseFullyCompleted ? <Award className="w-4 h-4" /> : <Dumbbell className="w-4 h-4" />}
                              </div>
                              <div className="min-w-0">
                                <span className="text-[11px] font-bold text-slate-400 block leading-tight">今日鍛鍊進度</span>
                                <span className="text-sm font-bold text-slate-800 block truncate">
                                  {isExerciseFullyCompleted ? '本項全組數已達標！' : `已完成 ${currentCount} / ${targetSets} 組`}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLogSet(ex.id);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                                isExerciseFullyCompleted 
                                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' 
                                  : 'bg-emerald-55 hover:bg-emerald-100 hover:text-emerald-800 text-emerald-800 border border-emerald-200'
                              }`}
                              id="btn-log-set"
                            >
                              {isExerciseFullyCompleted ? '重設進度' : '完成 1 組'}
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right column: Action demo cards as visual references */}
        <div className="lg:col-span-4" id="visual-demo-guide">
          <div className="bg-slate-50/40 border border-slate-100 rounded-3xl p-5 space-y-4">
            <span className="text-base font-bold text-slate-400 uppercase tracking-wider block">四大抗肌少動作示範圖</span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="bg-white border border-slate-100 p-2.5 rounded-2xl flex flex-col items-center text-center shadow-2xs">
                <img 
                  src={chairSquatDemo} 
                  alt="1. 椅子坐站起立" 
                  className="w-full aspect-square object-cover rounded-xl mb-2 border border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-bold text-slate-800">1. 椅子坐站起立</span>
              </div>
              <div className="bg-white border border-slate-100 p-2.5 rounded-2xl flex flex-col items-center text-center shadow-2xs">
                <img 
                  src={wallPushUpDemo} 
                  alt="2. 靠牆伏地挺身" 
                  className="w-full aspect-square object-cover rounded-xl mb-2 border border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-bold text-slate-800">2. 靠牆伏地挺身</span>
              </div>
              <div className="bg-white border border-slate-100 p-2.5 rounded-2xl flex flex-col items-center text-center shadow-2xs">
                <img 
                  src={calfRaiseDemo} 
                  alt="3. 扶椅站姿提踵" 
                  className="w-full aspect-square object-cover rounded-xl mb-2 border border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-bold text-slate-800">3. 扶椅站姿提踵</span>
              </div>
              <div className="bg-white border border-slate-100 p-2.5 rounded-2xl flex flex-col items-center text-center shadow-2xs">
                <img 
                  src={legExtensionDemo} 
                  alt="4. 坐姿直膝抬腿" 
                  className="w-full aspect-square object-cover rounded-xl mb-2 border border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-bold text-slate-800">4. 坐姿直膝抬腿</span>
              </div>
            </div>
            <p className="text-base text-slate-500 leading-normal">
              💡 動作示範僅供參考。居家訓練請務必扶穩椅背、牆壁，以安全為第一原則。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
