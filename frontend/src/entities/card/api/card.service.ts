import type { TSuccessResponse } from "@/shared/model/response"
import type { TCard } from "../model/types"
import { inject, injectable } from "inversify"
import { TTYPES, type THttpClient } from "@/shared/di/types"

@injectable()
export class CardService {
  constructor(@inject(TTYPES.HttpClient) private http: THttpClient) {}
  async getCards(boardId?: number, columnId?: number) {
    return await this.http.get<TSuccessResponse<TCard[]>>('/kanban/get_cards', {
      params: {
        board_id: boardId,
        column_id: columnId
      }
    })
  }

  async getCard(cardId?: number, columnId?: number) {
    return await this.http.post<TSuccessResponse<TCard>>('/kanban/get_card_by_id', {}, {
      params: {
        card_id: cardId,
        column_id: columnId
      }})
  }

  async createCard(columnId: number, data: {title: string, description: string}) {
    return await this.http.post<TSuccessResponse<TCard>>('/kanban/create_card', {title: data.title, description: data.description}, {
      params: {
        column_id: columnId
      }
    })
  }

  async updateCard(columnId: number, cardId: number, data: {title: string, description: string, order: number}) {
    return await this.http.patch<TSuccessResponse<TCard>>('/kanban/update_card', {title: data.title, description: data.description, order: data.order}, {
      params: {
        column_id: columnId,
        card_id: cardId
      }
    })
  }

  async reordersCards({columnId, newColumnId, cardId, newOrder}: {columnId: number, newColumnId: number, cardId: number, newOrder: number}) {
    return await this.http.patch<TSuccessResponse<TCard>>('/kanban/reorder_cards', {}, {
      params: {
        column_id: columnId, 
        new_column_id: newColumnId, 
        card_id: cardId, 
        new_order: newOrder
      }
    })
  }

  async deleteCard(columnId: number, cardId: number) {
    return await this.http.delete<TSuccessResponse<null>>('/kanban/delete_card', {
      params: {
        column_id: columnId,
        card_id: cardId
      }
    })
  }
}
