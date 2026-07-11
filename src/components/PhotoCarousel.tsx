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
  { image: chairSquatDemo, eyebrow: '居家阻力運動', title: '椅子坐站起立', description: '從日常坐站開始，逐步鍛鍊大腿與臀部肌力。', href: '#exercise' },
  { image: wallPushUpDemo, eyebrow: '安全入門動作', title: '靠牆伏地挺身', description: '利用牆面支撐，溫和訓練上肢與胸部肌群。', href: '#exercise' },
  { image: calfRaiseDemo, eyebrow: '下肢穩定練習', title: '扶椅站姿提踵', description: '在穩固支撐下練習，強化小腿與站立穩定度。', href: '#exercise' },
  { image: legExtensionDemo, eyebrow: '坐姿肌力訓練', title: '坐姿直膝抬腿', description: '坐著也能鍛鍊大腿前側，適合循序漸進練習。', href: '#exercise' },
  { image: hexBarDeadliftComic, eyebrow: '銀髮肌力勇氣劇場', title: '跨出第一步的勇氣', description: '從故事看見長者開始肌力訓練的歷程。', href: '#stories' },
  { image: courageComic, eyebrow: '銀髮肌力勇氣劇場', title: '改變從此刻開始', description: '每一次安全練習，都是累積自主生活能力的一步。', href: '#stories' },
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
            查看完整內容
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
