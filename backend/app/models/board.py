from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, DateTime, func
from typing import List
import datetime
from app.core.db import Base

class Board(Base):
  __tablename__ = 'boards'
  
  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  title: Mapped[str] = mapped_column(String(100))
  columns: Mapped[List["Column"]] = relationship("Column", back_populates='board', cascade='all, delete-orphan', lazy='selectin')
  owner_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete="CASCADE"))
  
  created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)