import 'axios';

declare module 'axios' {
  // Мы переопределяем интерфейс инстанса, который ты экспортируешь
  export interface AxiosInstance {
    // Теперь метод get возвращает Promise от R (твой тип), а не AxiosResponse<R>
    get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  }
}