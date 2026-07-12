import React, { useState } from 'react';
import {
  CalendarCheck2,
  Droplets,
  Dumbbell,
  Gift,
  NotebookPen,
  Sun,
  Utensils,
} from 'lucide-react';
import TemplateRequestForm from './TemplateRequestForm';

const templateItems = [
  { title: '早餐、午餐、晚餐蛋白質食物打卡', icon: Utensils },
  { title: '每日適當補充水分', icon: Droplets },
  { title: '活動或居家運動打卡', icon: Dumbbell },
  { title: '提醒自己避免長時間久坐', icon: CalendarCheck2 },
  { title: '戶外活動或接觸日光', icon: Sun },
  { title: '維持規律作息', icon: NotebookPen },
];

export default function NotionTemplateGift() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      id="notion-template-gift"
      className="scroll-mt-24 rounded-3xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/80 via-white to-white p-6 shadow-sm sm:p-8"
      aria-labelledby="notion-template-gift-title"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Gift className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm font-black tracking-widest text-amber-700">
          閱讀完成禮物
        </p>
        <h2
          id="notion-template-gift-title"
          className="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
        >
          不用追求完美，先看見這7天做得到的改變
        </h2>
        <p className="mt-4 text-xl font-black text-amber-800">
          免費領取《7天養肌打卡｜飲食・活動・生活習慣》Notion 模板
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
          複製模板到自己的 Notion 後，每天只要在第1～7天的欄位中，勾選當天做得到的項目，不必全部完成。模板會整理每個習慣的累積天數與7天累積率，幫助你看見容易維持的行動，以及下週可以縮小或調整的地方。
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          這是一份一般健康教育與個人生活紀錄工具，不能取代醫療診斷、治療或個別化專業建議。
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templateItems.map(({ title, icon: Icon }) => (
          <div
            key={title}
            className="flex min-h-20 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xs"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="font-black leading-relaxed text-slate-800">{title}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-amber-600 px-7 py-4 text-lg font-black text-white shadow-md transition hover:bg-amber-700"
          aria-expanded={showForm}
          aria-controls="template-request-form-container"
          onClick={() => setShowForm((current) => !current)}
        >
          <NotebookPen className="h-5 w-5" aria-hidden="true" />
          {showForm ? '收起領取表單' : '填寫心得，免費領取模板'}
        </button>
      </div>

      <div id="template-request-form-container">
        {showForm && <TemplateRequestForm />}
      </div>
    </section>
  );
}
