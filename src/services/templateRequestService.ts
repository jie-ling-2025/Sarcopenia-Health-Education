import {
  TemplateRequestFormData,
  TemplateRequestSubmissionResponse,
} from '../types/templateRequest';

export class TemplateRequestNotReadyError extends Error {
  constructor() {
    super('Template request endpoint is not configured.');
    this.name = 'TemplateRequestNotReadyError';
  }
}

export class TemplateRequestSubmissionError extends Error {
  constructor() {
    super('Template request submission failed.');
    this.name = 'TemplateRequestSubmissionError';
  }
}

function isSuccessfulResponse(
  value: unknown,
): value is TemplateRequestSubmissionResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    value.success === true
  );
}

export async function submitTemplateRequest(
  formData: TemplateRequestFormData,
): Promise<TemplateRequestSubmissionResponse> {
  const endpoint = import.meta.env.VITE_TEMPLATE_REQUEST_ENDPOINT?.trim();

  if (!endpoint) {
    throw new TemplateRequestNotReadyError();
  }

  if (formData.website) {
    throw new TemplateRequestSubmissionError();
  }

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new TemplateRequestSubmissionError();
  }

  if (!response.ok) {
    throw new TemplateRequestSubmissionError();
  }

  const result: unknown = await response.json().catch(() => null);

  if (!isSuccessfulResponse(result)) {
    throw new TemplateRequestSubmissionError();
  }

  return result;
}
