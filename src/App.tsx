/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import PhotoCarousel from './components/PhotoCarousel';
import SarcfScreening from './components/SarcfScreening';
import ProteinCalculator from './components/ProteinCalculator';
import WorkoutTimer from './components/WorkoutTimer';
import InspirationalComic from './components/InspirationalComic';
import { ShieldCheck, Flame, Sun, Droplets, Activity, Calculator, Utensils, Dumbbell, BookOpen, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-amber-50/30 font-sans antialiased" id="top">
      <nav className="sticky top-0 z-50 border-b border-amber-100 bg-white/95 shadow-sm backdrop-blur" aria-label="主要導覽">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="min-w-fit font-black text-amber-900">
            銀髮健康守護指南
          </a>
          <div className="flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap text-sm font-bold text-slate-600">
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#overview">認識肌少症</a>
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#sarc-f">快速檢測</a>
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#protein">蛋白質助手</a>
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#exercise">居家運動</a>
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#stories">勇氣故事</a>
            <a className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href="#health-guide">健康知識</a>
          </div>
        </div>
      </nav>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8" id="content-container">
        <PhotoCarousel />

        <section id="feature-entry" className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm md:p-8" aria-labelledby="feature-entry-title">
          <div className="mb-6">
            <p className="mb-2 text-sm font-black tracking-widest text-amber-700">快速開始</p>
            <h2 id="feature-entry-title" className="text-2xl font-black text-slate-900 md:text-3xl">這個工具可以幫您做什麼？</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">依照需求直接前往檢測、飲食規劃、運動練習或健康知識，原有完整內容都保留在下方。</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { href: '#sarc-f', title: 'SARC-F 快速檢測', text: '用五個問題初步了解肌少症風險。', icon: Activity, color: 'text-rose-600 bg-rose-50' },
              { href: '#protein', title: '蛋白質攝取試算', text: '依體重與活動量估算每日目標。', icon: Calculator, color: 'text-amber-700 bg-amber-50' },
              { href: '#protein', title: '日常配餐累加', text: '挑選常見食材，查看蛋白質進度。', icon: Utensils, color: 'text-emerald-700 bg-emerald-50' },
              { href: '#exercise', title: '居家阻力運動', text: '跟著動作說明、計時與組數練習。', icon: Dumbbell, color: 'text-blue-700 bg-blue-50' },
              { href: '#stories', title: '銀髮肌力故事', text: '用圖像故事建立持續鍛鍊的勇氣。', icon: BookOpen, color: 'text-violet-700 bg-violet-50' },
            ].map(({ href, title, text, icon: Icon, color }) => (
              <a key={title} href={href} className="group rounded-2xl border border-slate-100 p-4 transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md">
                <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-black leading-snug text-slate-900 group-hover:text-amber-800">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                <span className="mt-3 inline-block text-sm font-black text-amber-700">前往使用 →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Original educational article content is preserved as the overview section. */}
        <section id="overview" className="scroll-mt-24">
          <div className="mb-4 px-1">
            <p className="text-sm font-black tracking-widest text-amber-700">完整衛教內容</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">認識肌少症與預防重點</h2>
          </div>
          <Header />
        </section>

        {/* Section 1a: SARC-F Questionnaire Screen */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="sarc-f"
          className="scroll-mt-24"
        >
          <SarcfScreening />
        </motion.div>

        {/* Section 1b: Protein Intake Calculator & Planner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          id="protein"
          className="scroll-mt-24"
        >
          <ProteinCalculator />
        </motion.div>

        {/* Section 2: Home Resistance Exercise Guide & Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="exercise"
          className="scroll-mt-24"
        >
          <WorkoutTimer />
        </motion.div>

        {/* Section 2.5: Inspirational Manga Theater */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          id="stories"
          className="scroll-mt-24"
        >
          <InspirationalComic />
        </motion.div>

        {/* Section 3: Extra Clinical Guidelines and Sarcopenia Prevention Fact Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="scroll-mt-24 bg-gradient-to-b from-blue-50/50 via-white to-white rounded-3xl border-2 border-blue-100/90 p-6 md:p-8 shadow-sm"
          id="health-guide"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-xs flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">銀髮族預防肌少症：日常生活核心指導方針</h2>
              <p className="text-base text-slate-500 font-medium mt-1">骨科與老年醫學科推薦：除了運動與吃肉，還有這些關鍵細節！</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="lifestyle-guidelines-grid">
            
            {/* Sunshine & Vit D */}
            <div className="p-4 rounded-2xl bg-amber-50/20 border border-amber-100 space-y-2">
              <div className="flex items-center gap-2 text-amber-800">
                <Sun className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <h3 className="font-bold text-base">一、日曬與維生素 D 補充</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                維生素 D 可以促進腸道吸收鈣質、維持肌肉組織收縮，更是對抗肌少與骨質疏鬆的關鍵。
              </p>
              <ul className="text-base text-slate-500 space-y-1 pl-4 list-disc leading-normal">
                <li><strong>曬太陽</strong>：每天早上或傍晚，露出手臂日曬 15 分鐘，刺激身體自然合成。</li>
                <li><strong>飲食攝取</strong>：多吃黑木耳、鮭魚、香菇，或每日補充 800 - 1000 IU 維生素 D3。</li>
              </ul>
            </div>

            {/* Hydration */}
            <div className="p-4 rounded-2xl bg-blue-50/20 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-blue-800">
                <Droplets className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <h3 className="font-bold text-base">二、水分對肌肉代謝極度重要</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                長輩容易因口渴感覺遲鈍而缺水。蛋白質的代謝和排除需要充足水分，水分不足會加重腎臟負擔。
              </p>
              <ul className="text-base text-slate-500 space-y-1 pl-4 list-disc leading-normal">
                <li><strong>水分目標</strong>：每公斤體重應攝取 30 - 35ml 的水分 (如 60kg 長輩每天需約 1800ml)。</li>
                <li><strong>少量多次</strong>：不要等到口渴才喝。睡前一小時少喝以防夜尿，日間定時補充。</li>
              </ul>
            </div>

            {/* Workout safety */}
            <div className="p-4 rounded-2xl bg-orange-50/20 border border-orange-100 space-y-2">
              <div className="flex items-center gap-2 text-orange-800">
                <Flame className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <h3 className="font-bold text-base">三、超負荷與超補償規律</h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                增肌的核心在於「破壞與重建」。阻力訓練給予肌肉適度破壞（微喘、微痠），再透過營養完成超補償。
              </p>
              <ul className="text-base text-slate-500 space-y-1 pl-4 list-disc leading-normal">
                <li><strong>超負荷</strong>：運動時要感覺到「微喘、微吃力」，散步等有氧運動對防肌少效果有限。</li>
                <li><strong>肌肉修復</strong>：運動完 1 小時內是<strong>黃金吸收期</strong>，立刻補充 20-25g 蛋白質與少量碳水。</li>
                <li><strong>頻率安排</strong>：同一部位每週進行 2 - 3 次即可，每次訓練需間隔 48 小時。</li>
              </ul>
            </div>

          </div>

          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mt-6 text-base text-slate-500 text-center leading-relaxed" id="guideline-disclaimer">
            💡 本指南及計算器結果僅供健康生活型態規劃參考，不可取代專業醫療診斷。若您患有特殊慢性病 (如嚴重腎臟病、關節炎、心血管疾病)，進行任何高蛋白飲食與運動計畫前，請務必諮詢您的主治醫師或專業物理治療師。
          </div>
        </motion.div>

        <div className="flex justify-center py-2">
          <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-3 text-sm font-black text-amber-800 shadow-sm hover:bg-amber-50" aria-label="回到頁面頂端">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            回到頂端
          </a>
        </div>

        {/* Beautiful Simple Footer */}
        <footer className="text-center text-xs text-slate-600 font-medium py-6 border-t border-slate-100/50 animate-fade-in" id="app-footer">
          本作品由安南醫院居家與護理之家共同設計與製作，僅供健康衛教與學習參考。 ‧ © {new Date().getFullYear()}
        </footer>

      </div>
      </main>
    </div>
  );
}
