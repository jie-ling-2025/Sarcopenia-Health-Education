import React from 'react';
import { ShieldAlert, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="mb-8" id="app-header">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto py-6"
      >
        <motion.div
          animate={{ 
            y: [0, -6, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg md:text-xl font-black bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 text-amber-900 border-2 border-amber-400 shadow-md mb-6 hover:shadow-lg transition-shadow relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500/30 animate-pulse" />
          </motion.div>
          <span className="tracking-wider bg-gradient-to-r from-amber-950 to-orange-950 bg-clip-text text-transparent">
            銀髮族健康守護指南
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)] ml-1"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight bg-gradient-to-r from-orange-600 via-amber-800 to-slate-900 bg-clip-text text-transparent pb-1">
          遠離肌少症：銀髮族增肌防流失攻略
        </h1>
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
          肌力是自主生活的尊嚴。隨著年齡增長，肌肉流失速度加快，可能導致跌倒、失能等風險。本指南提供科學且簡易的自我檢測、蛋白質飲食攻略與安全居家阻力訓練，守護您的關鍵肌力！
        </p>
      </motion.div>

      {/* Quick educational grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6" id="edu-grid">
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow"
          id="edu-card-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-4 shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-900 text-xl mb-3 border-l-4 border-rose-500 pl-3 leading-none">什麼是肌少症？</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            伴隨老化而產生的骨骼肌品質衰退、肌肉量減少、以及肌力與體能下降的現象。40歲後肌肉每10年流失 8%，70歲後流失速度更增加至 15%！
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow"
          id="edu-card-2"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 shadow-xs">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <h3 className="font-black text-slate-900 text-xl mb-3 border-l-4 border-amber-500 pl-3 leading-none">肌少症的五大警訊</h3>
          <ul className="text-base text-slate-700 leading-relaxed space-y-1.5 list-disc pl-4.5">
            <li><strong>提不起</strong>：提 5 公斤重物感到吃力。</li>
            <li><strong>走得慢</strong>：平地走路吃力，甚至慢於 0.8m/s。</li>
            <li><strong>起不來</strong>：從椅子起身需要雙手撐扶.</li>
            <li><strong>爬不動</strong>：爬 10 階樓梯中間必須休息。</li>
            <li><strong>常跌倒</strong>：過去一年跌倒 2 次或以上。</li>
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow"
          id="edu-card-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-900 text-xl mb-3 border-l-4 border-emerald-500 pl-3 leading-none">預防的三大支柱</h3>
          <p className="text-base text-slate-700 leading-relaxed">
            透過<strong>「規律阻力運動」</strong>刺激肌肉生長、搭配<strong>「補充足量優質蛋白」</strong>做為增肌原料、以及<strong>「充足維生素 D」</strong>促進鈣質與肌肉合成，三者缺一不可！
          </p>
        </motion.div>
      </div>
    </header>
  );
}
