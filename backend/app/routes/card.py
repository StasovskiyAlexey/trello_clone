from fastapi import APIRouter, Depends
from app.schemas.response import SuccessResponse
from app.schemas.card import CardResponse, CardUpdate, CardCreate
from app.services import CardService
from app.dependencies.services import get_card_service
from app.dependencies.user import get_current_user
from app.models import User

card_router = APIRouter(prefix='/api/v1/cards', tags=['cards'])

@card_router.get('/get_cards', response_model=SuccessResponse[list[CardResponse]])
async def get_cards(board_id: int, column_id: int, service: CardService = Depends(get_card_service)):
  cards = await service.get_all_cards(column_id, board_id)
  return SuccessResponse(
    data=cards
  )

@card_router.post('/get_card_by_id', response_model=SuccessResponse[CardResponse])
async def get_card(card_id: int, column_id: int, service: CardService = Depends(get_card_service)):
  card = await service.get_card_by_id(card_id, column_id)
  return SuccessResponse( 
    data=card
  )

@card_router.post('/create_card', response_model=SuccessResponse[CardResponse])
async def create_card(card_data: CardCreate, column_id: int, user: User = Depends(get_current_user), service: CardService = Depends(get_card_service)):
  new_card = await service.create_card(card_data, column_id, user.id)
  return SuccessResponse(
    message='Новую карточку успешно создано',
    data=new_card
  )

@card_router.patch('/update_card', response_model=SuccessResponse[CardResponse])
async def update_card(card_id: int, column_id: int, card_data: CardUpdate, user: User = Depends(get_current_user), service: CardService = Depends(get_card_service)):
  updated_card = await service.update_card(card_id, column_id, card_data, user.id)
  return SuccessResponse(
    message='Карточка успешно обновлена',
    data=updated_card
  )

@card_router.patch('/reorder_cards', response_model=SuccessResponse[None])
async def reoders_cards(column_id: int, new_column_id: int, card_id: int, new_order: int, service: CardService = Depends(get_card_service)):
  await service.reorders_cards(column_id, new_column_id, card_id, new_order)
  return SuccessResponse(
    message='Карточку успешно обновлена'
  )

@card_router.delete('/delete_card', response_model=SuccessResponse[CardResponse])
async def delete_card(card_id: int, column_id: int, service: CardService = Depends(get_card_service)):
  deleted_card = await service.delete_card(column_id, card_id)
  return SuccessResponse(
    message='Карточка успешно удалена',
    data=deleted_card
  )