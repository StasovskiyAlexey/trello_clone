from ..core.db import get_db
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.services import CardService, BoardService, ColumnService, UserService
from app.repository import BoardRepository, CardRepository, ColumnRepository, UserRepository

def get_board_service(db: AsyncSession = Depends(get_db)):
  return BoardService(BoardRepository(db))

def get_column_service(db: AsyncSession = Depends(get_db)):
  return ColumnService(ColumnRepository(db), BoardRepository(db))

def get_card_service(db: AsyncSession = Depends(get_db)):
  return CardService(CardRepository(db), ColumnRepository(db))

def get_user_service(db: AsyncSession = Depends(get_db)):
  return UserService(UserRepository(db))