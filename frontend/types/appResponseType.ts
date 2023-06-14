export default interface AppResponseType<T> {
  isSuccess: boolean;
  message: string;
  result: T;
}
