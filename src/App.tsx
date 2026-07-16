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
import SiteNav from './components/SiteNav';
import GiftPreview from './components/GiftPreview';
import NotionTemplateGift from './components/NotionTemplateGift';
import SarcfScreening from './components/SarcfScreening';
import ProteinCalculator from './components/ProteinCalculator';
import WorkoutTimer from './components/WorkoutTimer';
import InspirationalComic from './components/InspirationalComic';
import { ShieldCheck, Flame, Sun, Droplets, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-amber-50/30 font-sans antialiased" id="top">
      <SiteNav />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8" id="content-container">
        <PhotoCarousel />

        <GiftPreview />

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

        <NotionTemplateGift />

        <div className="flex justify-center py-2">
          <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-3 text-sm font-black text-amber-800 shadow-sm hover:bg-amber-50" aria-label="回到頁面頂端">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            回到頂端
          </a>
        </div>

        {/* Beautiful Simple Footer */}
        <footer className="text-center text-xs text-slate-600 font-medium py-6 border-t border-slate-100/50 animate-fade-in" id="app-footer">
          銀髮族肌少症預防指南 ‧ 專業飲食與阻力訓練簡易指導手冊 ‧ © {new Date().getFullYear()} ‧ 安南醫院居家長照組編製
        </footer>

      </div>
      </main>
    </div>
  );
}
