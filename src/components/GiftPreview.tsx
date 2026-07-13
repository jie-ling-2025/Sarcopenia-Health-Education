import React from 'react';
import { Gift, Heart, NotebookPen, Sparkles } from 'lucide-react';

export default function GiftPreview() {
  return (
    <section
      id="gift-preview"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm sm:p-8"
      aria-labelledby="gift-preview-title"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-amber-800 shadow-sm ring-1 ring-amber-200">
            <Gift className="h-4 w-4" aria-hidden="true" />
            閱讀限定小禮物
          </div>
          <h2
            id="gift-preview-title"
            className="mt-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl"
          >
            讀到最後，免費領取「7天養肌打卡」Notion 模板
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
            完整閱讀本網站後，分享你的閱讀心得或改善建議，即可免費取得《7天養肌打卡｜飲食・活動・生活習慣》Notion 模板。每天勾選做得到的項目，從7天累積紀錄看見自己已經建立的習慣，以及下一步可以調整的地方。
          </p>
          <p className="mt-3 text-sm font-bold leading-relaxed text-amber-900">
            申請將透過 Google 表單收件，由製作團隊人工審核後寄送，並非即時寄送。
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-amber-600" aria-hidden="true" />
              免費領取
            </span>
            <span className="inline-flex items-center gap-1">
              <NotebookPen className="h-4 w-4 text-amber-600" aria-hidden="true" />
              Notion 可複製打卡模板
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-4 w-4 text-rose-600" aria-hidden="true" />
              適合長者、家屬、照顧者及醫護人員
            </span>
          </p>
        </div>

        <a
          href="#notion-template-gift"
          className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-4 text-base font-black text-white shadow-md transition hover:bg-amber-700"
        >
          <NotebookPen className="h-5 w-5" aria-hidden="true" />
          看看模板內容
        </a>
      </div>
    </section>
  );
}
