from app.repository import CardRepository, ColumnRepository
from app.core.exceptions import AppError
from app.schemas.card import CardCreate, CardUpdate

class CardService:
  def __init__(self, repository: CardRepository, column_repository: ColumnRepository):
    self.repository = repository
    self.column_repository = column_repository
    
  async def get_all_cards(self, column_id: int, board_id: int):
    exist_column = await self.column_repository.get_column_by_id(column_id, board_id)
    
    if not exist_column:
      raise AppError(400, f'Невозможно создать карточку, так как отсутствует столбец с ID {column_id}')
    
    return await self.repository.get_all_cards(column_id)

  async def get_card_by_id(self, card_id: int, column_id: int):
    exist_card = await self.repository.get_card_by_id(card_id, column_id)
    
    if not exist_card:
      raise AppError(400, 'Такой карточки не существует')
    
    return exist_card
  
  async def create_card(self, card: CardCreate, column_id: int, creator_id: int):
    exist_card = await self.repository.get_card_by_title(card.title, column_id)

    if exist_card:
      raise AppError(400, 'Такая карточка уже создана')
    
    return await self.repository.create_card(card, column_id, creator_id)
  
  async def update_card(self, card_id: int, column_id: int, card: CardUpdate, user_id: int):
    exist_card = await self.repository.get_card_by_id(card_id, column_id)

    if exist_card is None:
      raise AppError(400, f'Карточки с ID {card_id} не существует')
    
    return await self.repository.update_card(card_id, column_id , card, user_id)
  
  async def reorders_cards(self, column_id: int, new_column_id: int, card_id: int, new_order: int):
    return await self.repository.reorder_cards(column_id, new_column_id, card_id, new_order)
  
  async def delete_card(self, column_id: int, card_id: int):
    exist_card = await self.repository.get_card_by_id(card_id, column_id)
    
    if exist_card is None:
      raise AppError(400, f'Карточки с ID {card_id} не существует')
    
    return await self.repository.delete_card(exist_card)