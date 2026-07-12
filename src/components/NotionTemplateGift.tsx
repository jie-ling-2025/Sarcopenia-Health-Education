import React, { useState } from 'react';
import {
  BarChart3,
  CalendarCheck2,
  Droplets,
  Dumbbell,
  Gift,
  HeartPulse,
  NotebookPen,
  Smile,
  Users,
  Utensils,
} from 'lucide-react';
import TemplateRequestForm from './TemplateRequestForm';

const templateItems = [
  { title: '7天養肌目標設定', icon: CalendarCheck2 },
  { title: '每日三餐蛋白質紀錄', icon: Utensils },
  { title: '居家運動與日常活動打卡', icon: Dumbbell },
  { title: '水分、日照與規律生活紀錄', icon: Droplets },
  { title: '每日身體感受', icon: Smile },
  { title: '7天成果回顧', icon: BarChart3 },
  { title: '家屬觀察筆記', icon: Users },
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
          把今天學到的知識，變成接下來7天的行動
        </h2>
        <p className="mt-4 text-xl font-black text-amber-800">
          免費領取《7天養肌行動計畫》Notion 模板
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
          這份模板協助你記錄每天的蛋白質飲食、居家運動、水分、日照、規律生活及身體感受。它是一份一般健康教育與生活紀錄工具，不能取代醫療診斷、治療或個別化專業建議。
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

      <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-base leading-relaxed text-slate-700">
        <p className="flex items-start gap-2">
          <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
          請分享實際閱讀心得或改善建議；填寫時不要提供病歷號、完整診斷、用藥或其他敏感健康資料。
        </p>
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
