import React, { useState } from 'react';
import { SARC_F_QUESTIONS } from '../types';
import { ClipboardList, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SarcfScreening() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const totalScore = Object.keys(answers).reduce((sum: number, key) => sum + (answers[key] || 0), 0);
  const questionsCount = SARC_F_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isCompleted = answeredCount === questionsCount;

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50/50 via-white to-white rounded-3xl border-2 border-indigo-100/90 p-6 md:p-8 shadow-sm" id="sarcf-screening-panel">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xs flex-shrink-0 mt-0.5">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">肌少症快速自我檢測 <span className="text-indigo-600 font-extrabold">(SARC-F)</span></h2>
          <p className="text-base text-slate-500 font-medium mt-1">國際醫學公認最簡單有效的肌少症篩檢量表</p>
        </div>
      </div>

      <div className="space-y-6" id="sarcf-questions">
        {SARC_F_QUESTIONS.map((question, index) => {
          const selectedScore = answers[question.id];
          return (
            <div key={question.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0" id={`q-block-${question.id}`}>
              <div className="flex items-start gap-2.5 mb-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <span className="text-sm font-semibold text-indigo-600 block mb-0.5">{question.category}</span>
                  <p className="text-base font-bold text-slate-800 leading-relaxed">{question.text}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-8">
                {question.options.map((option) => {
                  const isSelected = selectedScore === option.score;
                  return (
                    <button
                      key={option.score}
                      type="button"
                      onClick={() => handleSelectOption(question.id, option.score)}
                      className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50/50'
                      }`}
                      id={`opt-${question.id}-${option.score}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <span className="text-base font-bold block mb-0.5">
                            {option.label} <span className="text-slate-400 font-normal">({option.score}分)</span>
                          </span>
                          <span className="text-base leading-tight text-slate-500 block">
                            {option.description}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4" id="sarcf-footer">
        <div className="text-base text-slate-600 text-center sm:text-left">
          填寫進度：<span className="font-semibold text-slate-900">{answeredCount}</span> / {questionsCount}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors w-full sm:w-auto"
              id="btn-reset-sarcf"
            >
              <RotateCcw className="w-4 h-4" /> 重填
            </button>
          )}

          <button
            disabled={!isCompleted}
            onClick={() => setShowResult(true)}
            className={`w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-xs transition-all ${
              isCompleted 
                ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 cursor-pointer' 
                : 'bg-slate-300 cursor-not-allowed'
            }`}
            id="btn-show-result"
          >
            觀看檢測結果
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showResult && isCompleted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
            id="sarcf-result-block"
          >
            <div className={`p-6 rounded-2xl border-2 shadow-xs ${
              totalScore >= 4 
                ? 'bg-rose-50/90 border-rose-200 text-rose-950' 
                : 'bg-emerald-50/95 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    totalScore >= 4 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {totalScore >= 4 ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-semibold uppercase tracking-wider text-slate-500">篩檢總分</span>
                      <span className="text-3xl font-extrabold">{totalScore}</span>
                      <span className="text-base font-medium text-slate-500">/ 10 分</span>
                    </div>
                    <h3 className="text-lg font-bold mt-1">
                      {totalScore >= 4 ? '屬於「肌少症高風險族群」' : '檢測結果「正常」'}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-base leading-relaxed border-t border-slate-100/50 pt-4" id="sarcf-suggestion-text">
                {totalScore >= 4 ? (
                  <div className="space-y-2">
                    <p>
                      <strong>💡 醫學指南建議：</strong>
                      您的 SARC-F 篩檢分數大於或等於 4 分，這代表您的日常活动能力已受到肌力流失的明顯影響。
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-rose-850">
                      <li>建議儘早至<strong>醫院老年醫學科、家醫科或復健科</strong>尋求醫師與物理治療師的專業精密評估（如握力測試、起立行走測試等）。</li>
                      <li>切勿灰心，研究證實透過<strong>漸進式阻力運動</strong>與<strong>高蛋白質飲食調養</strong>，即使 80、90 歲長輩依然能成功增長肌肉！</li>
                      <li>請善用下方的<strong>飲食計算器</strong>與<strong>居家訓練計畫</strong>，在安全防跌的原則下，開啟您的防肌少生活。</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>
                      <strong>💡 醫學指南建議：</strong>
                      恭喜您！您的分數低於 4 分，目前日常生活肌力表現尚佳，請繼續保持！
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-emerald-850">
                      <li>年齡增長是無聲的肌肉殺手，<strong>預防勝於治療</strong>。每天依然要維持攝取足夠優質蛋白質。</li>
                      <li>每週進行 2 - 3 次簡易居家阻力運動，能有效維持骨骼肌密度，儲存健康資產！</li>
                      <li>可以利用下方工具試算自己合適的蛋白質攝取量，並參照我們的運動指引來鍛鍊。</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
