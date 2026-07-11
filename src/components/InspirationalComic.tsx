import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Image as ImageIcon, 
  Award
} from 'lucide-react';

// @ts-ignore
import hexBarDeadliftComic from '../assets/images/hex_bar_deadlift_comic_1783791370018.jpg';
// @ts-ignore
import defaultCourageComic from '../assets/images/courage_comic_strip_1783767606541.jpg';

export default function InspirationalComic() {
  const title1 = '跨出第一步的勇氣：六角槓硬舉';
  const desc1 = '六角槓硬舉：1. 雙腳與肩同寬踩在六角槓正中央。 2. 屈髖下蹲並保持背部平直，雙手握穩兩側把手。 3. 核心收緊、吸氣，由大腿與臀部發力垂直向上站起！這能安全、平衡地鍛鍊全身肌群，是最適合銀髮族的全身性肌力運動。';

  const title2 = '改變從此刻開始：坐姿夾腿運動';
  const desc2 = '坐姿夾腿運動：1. 挺直坐在椅子上，將彈力球或厚枕頭夾於雙膝之間。 2. 雙腳掌踩實地面，由大腿內側發力向內擠壓，感覺大腿內側肌群緊繃收縮。 3. 保持用力夾緊 3-5 秒，隨後緩慢放鬆。此動作能有效強化大腿內收肌群、提升骨盆與膝關節穩定度。';

  return (
    <div className="bg-gradient-to-b from-rose-50/50 via-white to-white rounded-3xl border-2 border-rose-100/90 p-6 md:p-8 shadow-sm" id="inspirational-comic-manga-theater">
      
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-xs flex-shrink-0 mt-0.5">
            <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">銀髮肌力勇氣劇場</h2>
            <p className="text-base text-slate-500 font-medium mt-1">精選長輩運動蛻變勵志故事，為您的健康旅程注入滿滿的能量！</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg text-xs font-bold text-amber-800 border border-amber-100/50 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>自主記錄 ‧ 拒絕肌少</span>
        </div>
      </div>

      {/* Main Grid for Two Photo Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="photo-theater-grid">
        
        {/* SLOT 1 */}
        <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/30 rounded-2xl p-5 space-y-4" id="photo-slot-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/60 px-2.5 py-0.5 rounded-md inline-block">
                故事一 ‧ 跨出第一步
              </span>
            </div>

            {/* Title & Description View */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug border-l-4 border-orange-500 pl-2.5">{title1}</h3>
              <p className="text-base text-slate-600 leading-relaxed pl-3.5 border-l border-transparent">{desc1}</p>
            </div>
          </div>

          {/* Photo Frame (View Only) */}
          <div className="relative rounded-xl border border-slate-200 bg-white aspect-video shadow-xs overflow-hidden flex flex-col items-center justify-center">
            <img 
              src={hexBarDeadliftComic} 
              alt="故事一 ‧ 六角槓硬舉 勵志漫畫" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Info badge */}
            <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-xs text-[10px] text-white font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs z-10">
              <ImageIcon className="w-3 h-3 text-orange-400" />
              <span>示範動作</span>
            </div>
          </div>
        </div>

        {/* SLOT 2 */}
        <div className="flex flex-col justify-between border border-slate-100 bg-slate-50/30 rounded-2xl p-5 space-y-4" id="photo-slot-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/60 px-2.5 py-0.5 rounded-md inline-block">
                故事二 ‧ 改變從此刻開始
              </span>
            </div>

            {/* Title & Description View */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug border-l-4 border-orange-500 pl-2.5">{title2}</h3>
              <p className="text-base text-slate-600 leading-relaxed pl-3.5 border-l border-transparent">{desc2}</p>
            </div>
          </div>

          {/* Photo Frame (View Only) */}
          <div className="relative rounded-xl border border-slate-200 bg-white aspect-video shadow-xs overflow-hidden flex flex-col items-center justify-center">
            <img 
              src={defaultCourageComic} 
              alt="改變從此刻開始 漫畫" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Info badge */}
            <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-xs text-[10px] text-white font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs z-10">
              <ImageIcon className="w-3 h-3 text-orange-400" />
              <span>勵志漫畫</span>
            </div>
          </div>
        </div>

      </div>

      {/* Under guidance section */}
      <div className="mt-8 bg-slate-50 rounded-2xl p-4.5 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100/60 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
            <Award className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">💡 專家悄悄話：記錄的意義</h4>
            <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
              重訓對銀髮族的健康是非常卓越且被醫學證實的！
              看見自己持續的進步，不僅能獲得滿滿的成就感，更能激發持續鍛鍊的勇氣喔！
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
