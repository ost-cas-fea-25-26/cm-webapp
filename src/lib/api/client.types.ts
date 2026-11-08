export type ApiResponse<TData> = {
  hasError: boolean;
  data?: TData;
  error?: string;
};
