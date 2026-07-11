import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// These are real screenshots captured from each section of this website.
// @ts-ignore
import overviewScreenshot from '../assets/carousel/overview.png';
// @ts-ignore
import sarcfScreenshot from '../assets/carousel/sarc-f.png';
// @ts-ignore
import proteinScreenshot from '../assets/carousel/protein.png';
// @ts-ignore
import exerciseScreenshot from '../assets/carousel/exercise.png';
// @ts-ignore
import storiesScreenshot from '../assets/carousel/stories.png';
// @ts-ignore
import healthGuideScreenshot from '../assets/carousel/health-guide.png';

const slides = [
  {
    image: overviewScreenshot,
    eyebrow: '銀髮健康基礎',
    title: '認識肌少症',
    description: '了解肌少症的常見警訊、影響與預防三大支柱，建立正確的健康觀念。',
    href: '#overview',
    action: '開始認識',
  },
  {
    image: sarcfScreenshot,
    eyebrow: 'SARC-F 自我篩檢',
    title: '快速檢測',
    description: '透過五個簡單問題，初步了解肌力、行走、起立、爬樓梯與跌倒情形。',
    href: '#sarc-f',
    action: '開始檢測',
  },
  {
    image: proteinScreenshot,
    eyebrow: '飲食與營養規劃',
    title: '蛋白質助手',
    description: '依體重與活動狀況試算每日蛋白質目標，再用常見食材安排日常配餐。',
    href: '#protein',
    action: '開始試算',
  },
  {
    image: exerciseScreenshot,
    eyebrow: '安全居家練習',
    title: '居家運動',
    description: '跟著四套阻力運動的步驟、計時器與組數紀錄，循序漸進培養肌力。',
    href: '#exercise',
    action: '查看運動',
  },
  {
    image: storiesScreenshot,
    eyebrow: '銀髮肌力勇氣劇場',
    title: '勇氣故事',
    description: '從長者開始訓練的故事，看見持續記錄、逐步改變與自主生活的力量。',
    href: '#stories',
    action: '閱讀故事',
  },
  {
    image: healthGuideScreenshot,
    eyebrow: '日常生活核心指引',
    title: '健康知識',
    description: '整理維生素 D、水分、運動強度與休息安排等日常健康衛教重點。',
    href: '#health-guide',
    action: '閱讀指南',
  },
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-950 shadow-xl"
      aria-roledescription="carousel"
      aria-label="銀髮健康六大章節預覽"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 50) goTo(current + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className="relative min-h-[430px] w-full shrink-0 md:min-h-[560px]"
            aria-hidden={index !== current}
          >
            <img
              src={slide.image}
              alt={`${slide.title}章節畫面預覽`}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/10" />
            <div className="relative z-10 mx-auto flex min-h-[430px] max-w-6xl flex-col justify-end px-8 py-12 text-white md:min-h-[560px] md:px-16 md:py-16">
              <p className="mb-3 text-sm font-black tracking-[0.2em] text-amber-300">{slide.eyebrow}</p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">{slide.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 md:text-xl">{slide.description}</p>
              <a href={slide.href} className="mt-7 inline-flex w-fit rounded-full bg-amber-500 px-7 py-3.5 font-black text-slate-950 shadow-lg hover:bg-amber-400">
                {slide.action}
              </a>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(current - 1)}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white md:left-8"
        aria-label="上一個章節"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white md:right-8"
        aria-label="下一個章節"
      >
        <ChevronRight aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-6 pb-5 pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" aria-label="選擇章節預覽">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(index)}
                className={`h-3 rounded-full transition-all ${index === current ? 'w-9 bg-amber-400' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                aria-label={`顯示第 ${index + 1} 張：${slide.title}`}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="flex min-w-fit items-center gap-2 rounded-full border border-white/25 bg-slate-950/50 px-4 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/10"
            aria-label={playing ? '暫停章節自動播放' : '開始章節自動播放'}
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {playing ? '暫停' : '播放'}
          </button>
        </div>
      </div>
    </section>
  );
}
