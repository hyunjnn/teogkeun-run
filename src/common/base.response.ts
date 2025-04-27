export class BaseResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data ?? null;
  }
}
