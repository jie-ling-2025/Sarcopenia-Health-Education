import {
  TemplateRequestFieldErrors,
  TemplateRequestFormData,
} from '../types/templateRequest';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

export function characterCount(value: string): number {
  return Array.from(value.trim()).length;
}

export function sanitizeTemplateRequest(
  formData: TemplateRequestFormData,
): TemplateRequestFormData {
  return {
    ...formData,
    displayName: formData.displayName.trim(),
    role: formData.role.trim(),
    email: formData.email.trim().toLowerCase(),
    feedback: formData.feedback.trim(),
    website: formData.website?.trim() ?? '',
  };
}

function hasMeaningfulFeedback(value: string): boolean {
  const meaningfulCharacters = value.replace(/[\s\p{P}\p{S}]/gu, '');
  return Array.from(meaningfulCharacters).length >= 5;
}

export function validateTemplateRequest(
  formData: TemplateRequestFormData,
): TemplateRequestFieldErrors {
  const errors: TemplateRequestFieldErrors = {};
  const displayNameLength = characterCount(formData.displayName);
  const roleLength = characterCount(formData.role);
  const feedbackLength = characterCount(formData.feedback);

  if (!formData.displayName) {
    errors.displayName = '請填寫希望我們如何稱呼你。';
  } else if (displayNameLength < 2) {
    errors.displayName = '稱呼至少需要2個字元。';
  } else if (displayNameLength > 30) {
    errors.displayName = '稱呼最多30個字元。';
  }

  if (!formData.role) {
    errors.role = '請填寫您的職稱或身分。';
  } else if (roleLength < 2) {
    errors.role = '職稱或身分至少需要2個字元。';
  } else if (roleLength > 50) {
    errors.role = '職稱或身分最多50個字元。';
  }

  if (!formData.email) {
    errors.email = '請填寫接收模板的電子郵件。';
  } else if (
    formData.email.length > 254 ||
    !EMAIL_PATTERN.test(formData.email)
  ) {
    errors.email = 'Email 格式似乎不正確，請再次確認。';
  }

  if (!formData.feedback) {
    errors.feedback = '請填寫閱讀心得或改善建議。';
  } else if (feedbackLength < 20) {
    errors.feedback = `心得或改善建議至少需要20字，目前還差${20 - feedbackLength}字。`;
  } else if (feedbackLength > 500) {
    errors.feedback = '心得或改善建議最多500字。';
  } else if (!hasMeaningfulFeedback(formData.feedback)) {
    errors.feedback = '請提供具體心得或建議，避免只輸入空白或重複符號。';
  }

  if (!formData.consent) {
    errors.consent = '請先閱讀並勾選資料使用與健康聲明。';
  }

  return errors;
}

export function isTemplateRequestValid(
  errors: TemplateRequestFieldErrors,
): boolean {
  return Object.keys(errors).length === 0;
}
