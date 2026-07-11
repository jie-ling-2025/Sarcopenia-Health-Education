import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// @ts-ignore
import chairSquatDemo from '../assets/images/chair_squat_demo_1783758103687.jpg';
// @ts-ignore
import wallPushUpDemo from '../assets/images/wall_push_up_demo_1783758123342.jpg';
// @ts-ignore
import calfRaiseDemo from '../assets/images/calf_raise_demo_1783758434970.jpg';
// @ts-ignore
import legExtensionDemo from '../assets/images/leg_extension_demo_1783758446769.jpg';
// @ts-ignore
import hexBarDeadliftComic from '../assets/images/hex_bar_deadlift_comic_1783791370018.jpg';
// @ts-ignore
import courageComic from '../assets/images/courage_comic_strip_1783767606541.jpg';

const slides = [
  {
    image: hexBarDeadliftComic,
    eyebrow: '銀髮健康基礎',
    title: '認識肌少症',
    description: '了解肌少症的常見警訊、影響與預防三大支柱，建立正確的健康觀念。',
    href: '#overview',
    action: '開始認識',
  },
  {
    image: chairSquatDemo,
    eyebrow: 'SARC-F 自我篩檢',
    title: '快速檢測',
    description: '透過五個簡單問題，初步了解肌力、行走、起立、爬樓梯與跌倒情形。',
    href: '#sarc-f',
    action: '開始檢測',
  },
  {
    image: courageComic,
    eyebrow: '飲食與營養規劃',
    title: '蛋白質助手',
    description: '依體重與活動狀況試算每日蛋白質目標，再用常見食材安排日常配餐。',
    href: '#protein',
    action: '開始試算',
  },
  {
    image: wallPushUpDemo,
    eyebrow: '安全居家練習',
    title: '居家運動',
    description: '跟著四套阻力運動的步驟、計時器與組數紀錄，循序漸進培養肌力。',
    href: '#exercise',
    action: '查看運動',
  },
  {
    image: calfRaiseDemo,
    eyebrow: '銀髮肌力勇氣劇場',
    title: '勇氣故事',
    description: '從長者開始訓練的故事，看見持續記錄、逐步改變與自主生活的力量。',
    href: '#stories',
    action: '閱讀故事',
  },
  {
    image: legExtensionDemo,
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

  const slide = slides[current];

  return (
    <section
      className="overflow-hidden rounded-3xl border border-amber-100 bg-slate-950 shadow-xl"
      aria-roledescription="carousel"
      aria-label="銀髮健康精選內容"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 50) goTo(current + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="relative min-h-[420px] md:min-h-[520px]">
        <img
          key={slide.title}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent" />
        <div className="relative z-10 flex min-h-[420px] max-w-2xl flex-col justify-end p-7 text-white md:min-h-[520px] md:p-12">
          <p className="mb-3 text-sm font-black tracking-[0.2em] text-amber-300">{slide.eyebrow}</p>
          <h2 className="text-3xl font-black leading-tight md:text-5xl">{slide.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-100 md:text-lg">{slide.description}</p>
          <a href={slide.href} className="mt-6 inline-flex w-fit rounded-full bg-amber-500 px-6 py-3 font-black text-slate-950 shadow-lg hover:bg-amber-400">
            {slide.action}
          </a>
        </div>

        <button
          type="button"
          onClick={() => goTo(current - 1)}
          className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white"
          aria-label="上一張照片"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white"
          aria-label="下一張照片"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-slate-950 px-5 py-4">
        <div className="flex flex-wrap gap-2" aria-label="選擇照片">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => goTo(index)}
              className={`h-3 rounded-full transition-all ${index === current ? 'w-8 bg-amber-400' : 'w-3 bg-white/40 hover:bg-white/70'}`}
              aria-label={`顯示第 ${index + 1} 張：${item.title}`}
              aria-current={index === current ? 'true' : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="flex min-w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
          aria-label={playing ? '暫停照片自動播放' : '開始照片自動播放'}
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {playing ? '暫停' : '播放'}
        </button>
      </div>
    </section>
  );
}
