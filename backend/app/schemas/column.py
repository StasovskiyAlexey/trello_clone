from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import List
from app.schemas.card import CardResponse

class ColumnBase(BaseModel):
  title: str = Field(...)
  board_id: int = Field(...)
  order: int = Field(...)
  cards: list
  
  model_config = ConfigDict(from_attributes=True)
  
class ColumnCreate(BaseModel):
  title: str = Field(...)
  board_id: int = Field(...)
  
  model_config = ConfigDict(from_attributes=True)
  
class ColumnUpdate(BaseModel):
  title: str = Field(...)
  order: int = Field(...)
  
  model_config = ConfigDict(from_attributes=True)
  
class ColumnResponse(BaseModel):
  id: int = Field(...)
  title: str = Field(...)
  board_id: int = Field(...)
  order: int = Field(...)
  cards: list[CardResponse]
  
  created_at: datetime
  
  model_config = ConfigDict(from_attributes=True)

class ColumnOrderUpdate(BaseModel):
  id: int
  title: str = Field(...)
  board_id: int = Field(...)
  order: int = Field(...)
  cards: list
  created_at: datetime
  
class ColumnOrdersUpdateList(BaseModel):
  columns: List[ColumnOrderUpdate]