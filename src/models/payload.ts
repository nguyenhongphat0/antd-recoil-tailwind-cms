export interface Result<T = {}> {
  msg: string;
  err: number;
  data: T;
}
