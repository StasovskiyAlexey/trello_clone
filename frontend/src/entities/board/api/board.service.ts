import type { TSuccessResponse } from "@/shared/model/response"
import type { TBoard } from "../model/types"
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class BoardService {
  constructor(@inject(TTYPES.HttpClient) private http: THttpClient) {}
  
  async getBoards() {
    return await this.http.get<TSuccessResponse<TBoard[]>>('/boards/get_boards')
  }
  
  async getBoard(boardId?: number) {
    return await this.http.post<TSuccessResponse<TBoard>>('/boards/get_board_by_id', {}, {
      params: {
        board_id: boardId
      }
    })
  }

  async createBoard({data}: {data: {title: string}}) {
    return await this.http.post<TSuccessResponse<TBoard>>('/boards/create_board', {title: data?.title})
  }

  async updateBoard({data, boardId}: {data: {title: string}, boardId?: number}) {
    return await this.http.patch<TSuccessResponse<TBoard>>('/boards/update_board', {title: data?.title}, {
      params: {
        board_id: boardId
      }
    })
  }

  async deleteBoard(boardId: number) {
    return await this.http.delete<TSuccessResponse<TBoard>>('/boards/delete_board', {params: {board_id: boardId}})
  }
}
