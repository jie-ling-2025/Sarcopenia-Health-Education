export interface TemplateRequestFormData {
  displayName: string;
  role: string;
  email: string;
  feedback: string;
  consent: boolean;
  website?: string;
  formStartedAt: number;
}

export type TemplateRequestFieldName =
  | 'displayName'
  | 'role'
  | 'email'
  | 'feedback'
  | 'consent';

export type TemplateRequestFieldErrors = Partial<
  Record<TemplateRequestFieldName, string>
>;

export interface TemplateRequestSubmissionResponse {
  success: boolean;
  message?: string;
}
