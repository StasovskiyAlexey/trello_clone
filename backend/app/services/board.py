from app.repository import BoardRepository
from app.core.exceptions import AppError
from app.schemas.board import BoardCreate, BoardUpdate

class BoardService:
  def __init__(self, repository: BoardRepository):
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