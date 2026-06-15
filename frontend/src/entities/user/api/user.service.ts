import { axiosClient } from "@/shared/api/client";
import type { TSuccessResponse } from "@/shared/model/response";
import type { TUpdateUserAvatar, TUpdateUserPassword, TUser } from "@/types/user";
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class UserService {
  constructor(@inject(TTYPES.HttpClient) private http: THttpClient) {}
  async updateUserData(data: TUpdateUserAvatar) {
    const fd = new FormData()

    if (data.login) fd.append('login', data.login)
    if (data.email) fd.append('email', data.email)
    if (data.avatarUrl) fd.append('avatar_url', data.avatarUrl as File)
    
    return await this.http.patch<TSuccessResponse<TUser>>('/users/update_user/', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async updateUserAvatar(avatarUrl?: File | null) {
    const fd = new FormData()

    if (avatarUrl) fd.append('avatar_url', avatarUrl as File)
    
    return await axiosClient.patch<TSuccessResponse<TUser>>('/users/update_user_avatar', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async updatePassword({password, newPassword}: TUpdateUserPassword) {
    return await axiosClient.patch<TSuccessResponse<TUser>>('/users/update_user_password', { password, new_password: newPassword })
  }

  async deleteAccount(): Promise<TSuccessResponse<TUser>> {
    return await axiosClient.delete('/users/delete_user')
  }
}