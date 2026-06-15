import { axiosClient } from "@/shared/api/client";
import type { TSuccessResponse } from "@/shared/model/response";
import type { TUser, TUserLogin, TUserRegister } from "@/types/user";
import { AxiosError } from "axios";
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class AuthService {
  constructor (@inject(TTYPES.HttpClient) private http: THttpClient) {}
  async login(data: TUserLogin): Promise<TSuccessResponse<TUser>> {return await axiosClient.post('/users/login', {login: data.login, password: data.password})}

  async me() {
    try {
      return await this.http.get<TSuccessResponse<TUser>>('/users/me')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          return null
        }
      }
    }
  }

  async register(data: TUserRegister) {
    return await axiosClient.post<TSuccessResponse<TUser>>('/users/register', {login: data.login, email: data.email, password: data.password})
  }

  async logout() {
    return await axiosClient.post<TSuccessResponse<string>>('/users/logout', {})
  }
}