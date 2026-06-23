from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import List, Optional

class CardBase(BaseModel):
  title: str = Field(...)
  description: str = Field(...)
  order: int = Field(..., ge=1)
  creator_id: int = Field(...)
  column_id: int = Field(...)
  
  model_config = ConfigDict(from_attributes=True)
  
class CardCreate(BaseModel):
  title: str = Field(...)
  description: str = Field(...)

class CardUpdate(CardCreate):
  title: str = Field(...)
  description: str = Field(...)
  order: int = Field(..., ge=1)

class CardResponse(BaseModel):
  id: int = Field(...)
  title: str = Field(...)
  description: Optional[str] = None
  order: int = Field(...)
  creator_id: int = Field(...)
  column_id: int = Field(...)
  
  created_at: datetime
  
  model_config = ConfigDict(from_attributes=True)

class CardUpdateItem(BaseModel):  
  id: int
  order: int
  column_id: int

class CardListUpdate(BaseModel):
  cards: List[CardUpdateItem]