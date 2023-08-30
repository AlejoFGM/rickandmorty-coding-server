export interface BodyResponse<T> {
  message: string;
  data?: T;
  error: boolean;
}
