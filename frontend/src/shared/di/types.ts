import type { AxiosRequestConfig } from "axios";

export const TTYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BoardService: Symbol.for("BoardService"),
  CardService: Symbol.for("CardService"),
  ColumnService: Symbol.for("ColumnService")
}

export type THttpClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<{data: T}>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }>;
}