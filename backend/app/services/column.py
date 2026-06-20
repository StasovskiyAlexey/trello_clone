from app.repository import ColumnRepository, BoardRepository
from app.core.exceptions import AppError
from app.schemas.column import ColumnCreate, ColumnUpdate, ColumnOrdersUpdateList

class ColumnService:
  def __init__(self, repository: ColumnRepository, board_repository: BoardRepository):
    self.repository = repository
    self.board_repository = board_repository
    
  async def get_all_columns(self, board_id: int, owner_id: int):
    board = await self.board_repository.get_board_by_id(owner_id, board_id)
    
    if board is None:
      raise AppError(400, f'Доску с ID {board_id} не найдено')
    
    return await self.repository.get_all_columns(board_id)
  
  
  async def get_column_by_id(self, column_id: int, board_id: int):
    exist_column = await self.repository.get_column_by_id(column_id, board_id)
    
    if not exist_column:
      raise AppError(400, f'Колонку с ID {column_id} не найдено')
    
    return exist_column
  
  async def create_column(self, column: ColumnCreate):
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