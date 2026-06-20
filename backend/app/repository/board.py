from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.core.exceptions import AppError
from app.core.utils import update_existing_entity

from ..schemas.board import BoardUpdate, BoardCreate
from ..models import Board, Column

class BoardRepository:
  def __init__(self, db: AsyncSession):
    self.db = db
    
  async def get_all_boards(self, owner_id: int):
    query = select(Board).filter_by(owner_id=owner_id).options(selectinload(Board.columns).selectinload(Column.cards))
    boards = await self.db.scalars(query)
    return boards.all()
  
  async def get_board_by_id(self, owner_id: int, board_id: int):
    query = select(Board).filter_by(owner_id=owner_id, id=board_id).options(selectinload(Board.columns).selectinload(Column.cards))
    board = await self.db.scalar(query)
    return board
  
  async def get_board_by_title(self, owner_id: int, title: str):
    query = (select(Board)).filter_by(owner_id=owner_id, title=title).options(selectinload(Board.columns).selectinload(Column.cards))
    board = await self.db.scalar(query)
    return board
  
  async def create_board(self, owner_id: int, board: BoardCreate):
    new_board = Board(title=board.title, owner_id=owner_id)
    self.db.add(new_board)
    
    try:
      await self.db.commit()
      query = (select(Board).where(Board.id == new_board.id).options(selectinload(Board.columns)))
      result = await self.db.execute(query)
      return result.scalar_one()
    except Exception as e:
      await self.db.rollback()
      raise AppError(400, f'{e}')
    
  async def update_board(self, owner_id: int, board_id: int, board_data: BoardUpdate):
    exist_board = await self.get_board_by_id(owner_id, board_id)
    
    if not exist_board:
      raise AppError(400, 'Доска не найдена')
    
    updated_data = board_data.model_dump(exclude_unset=False)

    for key, value in updated_data.items():
      setattr(exist_board, key, value)

    return await update_existing_entity(self, exist_board, 'Помилка під час оновлення дошки')
  
  async def delete_board(self, board: Board):
    try:
      await self.db.delete(board)
      await self.db.commit()
      return board
    except:
      await self.db.rollback()
      raise AppError(500, 'Ошибка при удалении доски')