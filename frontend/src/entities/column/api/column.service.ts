import { axiosClient } from "@/shared/api/axios-client"
import type { TSuccessResponse } from "@/shared/model/response"
import type { TColumn } from "../model/types"
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class ColumnService {
  constructor(@inject(TTYPES.HttpClient) private http: THttpClient) {}
  async getColumns(boardId?: number) {
    return await this.http.get<TSuccessResponse<TColumn[]>>('/kanban/get_columns', {
      params: {
        board_id: boardId
      }
    })
  }

  async getColumn(boardId?: number, columnId?: number) {
    return await this.http.get<TSuccessResponse<TColumn>>('/kanban/get_column_by_id', {
      params: {
        board_id: boardId,
        column_id: columnId
      }
    })
  }

  async createColumn(title: string, boardId: number) {
    return await axiosClient.post<TSuccessResponse<TColumn>>('/kanban/create_column', {title, board_id: boardId})
  }

  async updateColumn(title: string, order: number, columnId: number, boardId: number) {
    return await this.http.patch<TSuccessResponse<TColumn>>('/kanban/update_column', {title, order}, {
      params: {
        column_id: columnId,
        board_id: boardId
      }
    })
  }

  async reorderColumns(boardId: number, columns: TColumn[]) {
    return await this.http.patch<TSuccessResponse<TColumn[]>>('/kanban/update_order_columns', {columns: columns}, {
      params: {
        board_id: boardId
      }
    })
  }

  async deleteColumn(boardId: number, columnId: number) {
    return await axiosClient.delete<TSuccessResponse<TColumn>>('/kanban/delete_column', {params: {board_id: boardId, column_id: columnId}})
  }
}