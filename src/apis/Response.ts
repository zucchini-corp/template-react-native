export default interface Response<T> {
  code: number;
  data: T;
  errorMessage?: string;
}
