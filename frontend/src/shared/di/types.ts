import type { AxiosRequestConfig } from "axios";

export const TTYPES = {
  HttpClient: Symbol.for("HttpClient"),
  BoardService: Symbol.for("BoardService"),
  CardService: Symbol.for("CardService"),
  ColumnService: Symbol.for("ColumnService"),
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService")
}

export type THttpClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}