import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#overview', label: '認識肌少症' },
  { href: '#sarc-f', label: '快速檢測' },
  { href: '#protein', label: '蛋白質助手' },
  { href: '#exercise', label: '居家運動' },
  { href: '#stories', label: '勇氣故事' },
  { href: '#health-guide', label: '健康知識' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-100 bg-white/95 shadow-sm" aria-label="主要導覽">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="font-black text-amber-900" onClick={() => setOpen(false)}>
          銀髮健康守護指南
        </a>

        <div className="hidden items-center gap-1 text-sm font-bold text-slate-600 md:flex">
          {links.map((link) => (
            <a key={link.href} className="rounded-full px-3 py-2 hover:bg-amber-50 hover:text-amber-900" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-900 md:hidden"
          aria-label="開啟主題選單"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true" aria-label="網站主題選單">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
            aria-label="關閉主題選單"
            onClick={() => setOpen(false)}
          />
          <aside id="mobile-navigation" className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-100 pb-5">
              <div>
                <p className="text-xs font-black tracking-widest text-amber-700">網站導覽</p>
                <p className="mt-1 text-lg font-black text-slate-900">選擇想看的主題</p>
              </div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
                aria-label="關閉主題選單"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3 text-lg font-black text-slate-800 hover:bg-amber-50 hover:text-amber-900"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-800">
                    {index + 1}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>

            <p className="mt-auto rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-500">
              點選主題後會直接前往對應的檢測、飲食、運動或健康衛教內容。
            </p>
          </aside>
        </div>
      )}
    </nav>
  );
}
