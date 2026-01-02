import { z } from "zod";

export type ApiResponse<TData> = {
  hasError: boolean;
  data?: TData;
  error?: string;
};

export type ValidationConfig<TData> = {
  schema?: z.ZodSchema<TData>;
};
