from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from ..schemas.column import ColumnResponse

class BoardBase(BaseModel):
  title: str = Field(...)
  
  model_config = ConfigDict(from_attributes=True)

class BoardCreate(BoardBase):
  pass

class BoardUpdate(BoardBase):
  pass

class BoardResponse(BoardBase):
  id: int = Field(...)
  title: str = Field(...)
  owner_id: int = Field(...) 
  columns: list[ColumnResponse]
  
  created_at: datetime
  
  model_config = ConfigDict(from_attributes=True)