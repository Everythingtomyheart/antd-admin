import request, { Result } from '@/plugins/axios';
export const setUrl = (url: string): string => `/auth/${url}`;
export interface ImgCode {
  base64: string;
  id: string;
}

export interface ValidateResult {
  verifyResult: boolean;
}
export function getCode(): Result<ImgCode> {
  return request.get(setUrl('verification'));
}

export function validateCode(id: string, answer: string): Result<ValidateResult> {
  return request.post(setUrl('verification/answers'), { id, answer });
}
