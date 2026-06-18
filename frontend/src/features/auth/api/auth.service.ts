import { axiosClient } from "@/shared/api/axios-client";
import type { TSuccessResponse } from "@/shared/model/response";
import type { TUser, TUserLogin, TUserRegister } from "@/entities/user";
import { AxiosError } from "axios";
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class AuthService {
  constructor (@inject(TTYPES.HttpClient) private http: THttpClient) {}
  async login(data: TUserLogin): Promise<TSuccessResponse<TUser>> {
    return await axiosClient.post('/users/login', {login: data.login, password: data.password})
  }

  async me() {
    try {
      const res = await this.http.get<TSuccessResponse<TUser>>('/users/me')
      return res
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          return null
        }
      }
    }
  }

  async register(data: TUserRegister) {
    const res = await this.http.post<TSuccessResponse<TUser>>('/users/register', {login: data.login, email: data.email, password: data.password})
    return res
  }

  async logout() {
    const res = await this.http.post<TSuccessResponse<string>>('/users/logout', {})
    return res
  }
}