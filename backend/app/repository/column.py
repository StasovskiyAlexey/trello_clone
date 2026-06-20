from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func
from sqlalchemy.orm import selectinload
from app.models import Column
from app.schemas.column import ColumnCreate, ColumnUpdate, ColumnOrdersUpdateList
from app.core.exceptions import AppError
from app.core.utils import update_existing_entity

class ColumnRepository:
  def __init__(self, db: AsyncSession):
    self.db = db
  
  async def get_all_columns(self, board_id: int):
    query = (select(Column)).filter_by(board_id=board_id).options(selectinload(Column.cards))
    columns = await self.db.scalars(query)
    return columns.all()
  
  async def get_column_by_id(self, column_id: int, board_id: int):
    query = (select(Column)).filter_by(id=column_id, board_id=board_id).options(selectinload(Column.cards))
    column = await self.db.scalar(query)
    return column
  
  async def get_column_by_title(self, title: str, board_id: int):
    query = (select(Column)).filter_by(title=title, board_id=board_id).options(selectinload(Column.cards))
    column = await self.db.scalar(query)
    return column
  
  async def create_column(self, column: ColumnCreate):
    query = select(Column).filter_by(board_id=column.board_id).order_by(Column.order.desc()).limit(1)
    columns = await self.db.execute(query)
    last_order = columns.scalars().first()

    order = (last_order.order + 1) if last_order is not None else 1

    new_column = Column(title=column.title, board_id=column.board_id, order=order)
    self.db.add(new_column)
    
    try:
      await self.db.commit()
      query = (select(Column).where(Column.id == new_column.id).options(selectinload(Column.cards)))
      result = await self.db.execute(query)
      return result.scalar_one()
    except Exception as e:
      await self.db.rollback()
      raise AppError(400, f'{e}')
  
  
  async def update_column(self, column_id: int, column_data: ColumnUpdate, board_id: int):
    exist_column = await self.get_column_by_id(column_id, board_id)
    
    if exist_column is None:
      raise AppError(404, f"Колонка з ID “{column_id}” не знайдена на дошці {board_id}")
    
    updated_data = column_data.model_dump(exclude_unset=False)
    
    for key, value in updated_data.items():
      setattr(exist_column, key, value)

    return await update_existing_entity(self, exist_column, 'Помилка під час оновлення колонки')
  
  async def reorder_columns(self, board_id: int, user_id: int, data: ColumnOrdersUpdateList):
    # exist_board = self.get_board_by_id(user_id, board_id)
    
    # if exist_board is None:
    #   raise AppError(400, 'Такой дошки не існує')

    columns = [col.model_dump() for col in data.columns]
    print(columns)
    
    await self.db.execute(update(Column), columns)
    await self.db.commit()
    
    return columns
  
  
  async def delete_column(self, column: Column):
    try:
      await self.db.delete(column)
      await self.db.commit()
      return column
    except:
      await self.db.rollback()
      raise AppError(500, 'Помилка при видаленні колонки')
  
  async def get_all_cards(self, column_id: int):
    query = (select(Card)).filter_by(column_id=column_id)
    cards = await self.db.scalars(query)
    return cards.all()