export type Mode = 'light' | 'dark';

export type PaginateParamsType = {
  pageIndex: number;
  pageSize: number;
};

export type TDataWithPagination<TData> = {
  datas: TData;
};

export type ResponseTypeWithPagination<TData> = {
  success: boolean;
  message: string;
  data: TDataWithPagination<TData>;
};

export type TApi = {
  success: boolean;
  message: string;
};

export type ResponseType<TData> = TApi & {
  data: TData;
};

export type TCombo<K, T extends string | number | symbol> = {
  [key in T]: K;
} & {
  id: string;
};

export type Combo = { id: number, name: string }