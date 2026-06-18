from ..repository.kanban_repository import KanbanRepository
from ..schemas.kanban import BoardCreate, BoardUpdate, ColumnCreate, ColumnUpdate, CardCreate, CardUpdate, ColumnOrdersUpdateList
from ..core.exceptions import AppError

class KanbanService:
  def __init__(self, repository: KanbanRepository):
    self.repository = repository
    
  async def get_all_boards(self, owner_id: int):
    return await self.repository.get_all_boards(owner_id)
  
  async def get_board_by_id(self, owner_id: int, board_id: int):
    board = await self.repository.get_board_by_id(owner_id, board_id)
    
    if not board:
      raise AppError(400, f'Доску с ID {board_id} не найдено')
    
    return board
  
  async def create_board(self, owner_id: int, board: BoardCreate):
    exist_board = await self.repository.get_board_by_title(owner_id, board.title)

    if exist_board:
      raise AppError(400, 'Доска с таким названием уже создана')

    return await self.repository.create_board(owner_id, board)
  
  async def update_board(self, owner_id: int, board_id: int, board: BoardUpdate):
    return await self.repository.update_board(owner_id, board_id, board)
  
  
  async def delete_board(self, owner_id: int, board_id: int):
    exist_board = await self.repository.get_board_by_id(owner_id, board_id)
    
    if exist_board is None:
      raise AppError(400, f'Доски C ID {board_id} не существует')
    
    return await self.repository.delete_board(exist_board)
  
  
  async def get_all_columns(self, board_id: int, owner_id: int):
    board = await self.repository.get_board_by_id(owner_id, board_id)
    
    if board is None:
      raise AppError(400, f'Доску с ID {board_id} не найдено')
    
    return await self.repository.get_all_columns(board_id)
  
  
  async def get_column_by_id(self, column_id: int, board_id: int):
    exist_column = await self.repository.get_column_by_id(column_id, board_id)
    
    if not exist_column:
      raise AppError(400, f'Колонку с ID {column_id} не найдено')
    
    return exist_column
  
  async def create_column(self, column: ColumnCreate):
    if column.board_id is None and column.board_id <= 0:
      raise AppError(400, f'Неможливо створити колонку з ID дошки {column.board_id}')
    
    exist_column = await self.repository.get_column_by_title(column.title, column.board_id)
    
    if exist_column:
      raise AppError(400, 'Такая колонка уже существует')
    
    return await self.repository.create_column(column)
  
  async def update_column(self, column_id: int, column: ColumnUpdate, board_id: int):
    return await self.repository.update_column(column_id, column, board_id)
  
  async def reorder_all_columns(self, board_id, user_id: int, data: ColumnOrdersUpdateList):
    return await self.repository.reorder_columns(board_id, user_id, data)
  
  async def delete_column(self, column_id: int, board_id: int):
    exist_column = await self.repository.get_column_by_id(column_id, board_id)
    
    if exist_column is None:
      raise AppError(400, f'Колонки с ID {column_id} не существует')
    
    return await self.repository.delete_column(exist_column)
  
  
  async def get_all_cards(self, column_id: int, board_id: int):
    exist_column = await self.repository.get_column_by_id(column_id, board_id)
    
    if not exist_column:
      raise AppError(400, f'Невозможно создать карточку, так как отсутствует столбец с ID {column_id}')
    
    return await self.repository.get_all_cards(column_id)

  async def get_card_by_id(self, card_id: int, column_id: int):
    exist_card = await self.repository.get_card_by_id(card_id, column_id)
    
    if not exist_card:
      raise AppError(400, 'Такой карты не существует')
    
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