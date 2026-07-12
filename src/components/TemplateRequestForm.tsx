import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import {
  TemplateRequestFieldErrors,
  TemplateRequestFieldName,
  TemplateRequestFormData,
} from '../types/templateRequest';
import {
  characterCount,
  isTemplateRequestValid,
  sanitizeTemplateRequest,
  validateTemplateRequest,
} from '../utils/templateRequestValidation';
import {
  submitTemplateRequest,
  TemplateRequestNotReadyError,
} from '../services/templateRequestService';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const fieldClassName =
  'mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-amber-400 focus:border-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-100';

function initialFormData(): TemplateRequestFormData {
  return {
    displayName: '',
    role: '',
    email: '',
    feedback: '',
    consent: false,
    website: '',
    formStartedAt: Date.now(),
  };
}

export default function TemplateRequestForm() {
  const [formData, setFormData] = useState<TemplateRequestFormData>(
    initialFormData,
  );
  const [errors, setErrors] = useState<TemplateRequestFieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const displayNameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    displayNameRef.current?.focus();
  }, []);

  const feedbackLength = characterCount(formData.feedback);
  const remainingFeedbackCharacters = Math.max(0, 20 - feedbackLength);

  const clearFieldError = (field: TemplateRequestFieldName) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

    if (status !== 'submitting') {
      setStatus('idle');
      setSubmissionMessage('');
    }
  };

  const focusFirstError = (fieldErrors: TemplateRequestFieldErrors) => {
    const focusTargets: Array<
      [TemplateRequestFieldName, React.RefObject<HTMLElement | null>]
    > = [
      ['displayName', displayNameRef],
      ['role', roleRef],
      ['email', emailRef],
      ['feedback', feedbackRef],
      ['consent', consentRef],
    ];

    const firstTarget = focusTargets.find(([field]) => fieldErrors[field]);
    firstTarget?.[1].current?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'submitting') return;

    const cleanedData = sanitizeTemplateRequest(formData);
    const validationErrors = validateTemplateRequest(cleanedData);

    setFormData(cleanedData);
    setErrors(validationErrors);

    if (!isTemplateRequestValid(validationErrors)) {
      setStatus('error');
      setSubmissionMessage('請檢查表單中標示的欄位。');
      requestAnimationFrame(() => focusFirstError(validationErrors));
      return;
    }

    setStatus('submitting');
    setSubmissionMessage('');

    try {
      await submitTemplateRequest(cleanedData);
      setStatus('success');
      setSubmissionMessage(
        '謝謝你的分享，Notion 模板連結將寄送至你填寫的電子郵件。若數分鐘後仍未收到，請確認 Email 是否正確，並檢查垃圾郵件匣。',
      );
    } catch (error: unknown) {
      setStatus('error');

      if (error instanceof TemplateRequestNotReadyError) {
        setSubmissionMessage('目前模板領取功能仍在準備中，請稍後再試。');
      } else {
        setSubmissionMessage('你的資料仍保留在表單中，請稍後再次送出。');
      }
    }
  };

  const feedbackCountText =
    feedbackLength < 20
      ? `目前 ${feedbackLength} 字／至少需要 20 字，還差 ${remainingFeedbackCharacters} 字`
      : `目前 ${feedbackLength} 字／已符合最低字數`;

  return (
    <form
      className="mt-8 space-y-6 rounded-3xl border border-amber-200 bg-white p-5 shadow-sm sm:p-8"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="template-request-form-title"
    >
      <div>
        <p className="text-sm font-black tracking-widest text-amber-700">
          領取資料
        </p>
        <h3
          id="template-request-form-title"
          className="mt-2 text-2xl font-black text-slate-900"
        >
          填寫心得，免費領取模板
        </h3>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          所有欄位皆為必填。可使用暱稱，不需提供完整姓名。
        </p>
      </div>

      <div>
        <label htmlFor="template-display-name" className="text-base font-black text-slate-800">
          如何稱呼你？ <span className="text-rose-700">（必填）</span>
        </label>
        <input
          ref={displayNameRef}
          id="template-display-name"
          name="displayName"
          type="text"
          value={formData.displayName}
          maxLength={30}
          autoComplete="nickname"
          placeholder="例如：小美、王小姐、阿哲"
          className={fieldClassName}
          aria-invalid={Boolean(errors.displayName)}
          aria-describedby={
            errors.displayName
              ? 'display-name-help display-name-error'
              : 'display-name-help'
          }
          onChange={(event) => {
            setFormData((current) => ({
              ...current,
              displayName: event.target.value,
            }));
            clearFieldError('displayName');
          }}
        />
        <p id="display-name-help" className="mt-2 text-sm text-slate-500">
          可填暱稱，不需要提供完整姓名。
        </p>
        {errors.displayName && (
          <p id="display-name-error" className="mt-2 flex items-start gap-2 text-sm font-bold text-rose-800" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.displayName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="template-role" className="text-base font-black text-slate-800">
          您的職稱或身分 <span className="text-rose-700">（必填）</span>
        </label>
        <input
          ref={roleRef}
          id="template-role"
          name="role"
          type="text"
          value={formData.role}
          maxLength={50}
          autoComplete="organization-title"
          placeholder="例如：護理師、照顧服務員、家屬、學生、一般民眾"
          className={fieldClassName}
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? 'role-error' : undefined}
          onChange={(event) => {
            setFormData((current) => ({ ...current, role: event.target.value }));
            clearFieldError('role');
          }}
        />
        {errors.role && (
          <p id="role-error" className="mt-2 flex items-start gap-2 text-sm font-bold text-rose-800" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.role}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="template-email" className="text-base font-black text-slate-800">
          接收模板的電子郵件 <span className="text-rose-700">（必填）</span>
        </label>
        <input
          ref={emailRef}
          id="template-email"
          name="email"
          type="email"
          inputMode="email"
          value={formData.email}
          maxLength={254}
          autoComplete="email"
          placeholder="例如：example@gmail.com"
          className={fieldClassName}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-help email-error' : 'email-help'}
          onChange={(event) => {
            setFormData((current) => ({ ...current, email: event.target.value }));
            clearFieldError('email');
          }}
        />
        <p id="email-help" className="mt-2 text-sm text-slate-500">
          Notion 模板連結將寄送至此信箱，請確認填寫正確。
        </p>
        {errors.email && (
          <p id="email-error" className="mt-2 flex items-start gap-2 text-sm font-bold text-rose-800" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="template-feedback" className="text-base font-black text-slate-800">
          閱讀這個網站後，請分享你的心得或改善建議
          <span className="text-rose-700">（必填）</span>
        </label>
        <textarea
          ref={feedbackRef}
          id="template-feedback"
          name="feedback"
          value={formData.feedback}
          maxLength={500}
          rows={7}
          placeholder="例如：哪些內容對你最有幫助、哪些地方不容易理解、希望未來增加哪些功能或衛教內容……"
          className={`${fieldClassName} resize-y leading-relaxed`}
          aria-invalid={Boolean(errors.feedback)}
          aria-describedby={
            errors.feedback
              ? 'feedback-count feedback-error'
              : 'feedback-count'
          }
          onChange={(event) => {
            setFormData((current) => ({
              ...current,
              feedback: event.target.value,
            }));
            clearFieldError('feedback');
          }}
        />
        <p
          id="feedback-count"
          className={`mt-2 text-sm font-bold ${
            feedbackLength < 20 ? 'text-amber-800' : 'text-emerald-800'
          }`}
          aria-live="polite"
        >
          {feedbackCountText}
        </p>
        {errors.feedback && (
          <p id="feedback-error" className="mt-2 flex items-start gap-2 text-sm font-bold text-rose-800" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.feedback}
          </p>
        )}
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="template-website">網站</label>
        <input
          id="template-website"
          name="website"
          type="text"
          value={formData.website}
          tabIndex={-1}
          autoComplete="off"
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              website: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed text-slate-700">
          <input
            ref={consentRef}
            type="checkbox"
            name="consent"
            checked={formData.consent}
            className="mt-1 h-5 w-5 shrink-0 accent-amber-700"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-details consent-error' : 'consent-details'}
            onChange={(event) => {
              setFormData((current) => ({
                ...current,
                consent: event.target.checked,
              }));
              clearFieldError('consent');
            }}
          />
          <span>
            我同意本網站將以上資料用於網站改善及寄送本次 Notion 模板。
            <span className="font-black text-rose-700">（必填）</span>
          </span>
        </label>
        <div id="consent-details" className="mt-3 space-y-2 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
          <p>
            <strong>隱私提醒：</strong>
            請勿在心得中填寫病歷號、身分證字號、完整疾病診斷、用藥內容或其他敏感個人與健康資料。
          </p>
          <p>
            <strong>健康聲明：</strong>
            我了解本網站及 Notion 模板提供一般健康教育與生活紀錄，不能取代醫療診斷、治療或個別化專業建議。
          </p>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-2 flex items-start gap-2 text-sm font-bold text-rose-800" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        )}
      </div>

      {submissionMessage && (
        <div
          className={`rounded-2xl border p-4 text-base leading-relaxed ${
            status === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
          role={status === 'success' ? 'status' : 'alert'}
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            {status === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <div>
              <p className="font-black">
                {status === 'success' ? '申請已送出' : '目前無法完成送出'}
              </p>
              <p className="mt-1">{submissionMessage}</p>
              {status === 'success' && (
                <p className="mt-2 font-bold">請不要重複送出相同申請。</p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-4 text-lg font-black text-white shadow-md transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
        {status === 'submitting'
          ? '送出中……'
          : status === 'success'
            ? '申請已送出'
            : '送出心得並領取模板'}
      </button>
    </form>
  );
}
