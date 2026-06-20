from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, DateTime, func, Text
import datetime
from app.core.db import Base
from typing import Optional

class Card(Base):
  __tablename__ = 'cards'
  
  id: Mapped[int] = mapped_column(primary_key=True)
  title: Mapped[str] = mapped_column(String(200))
  description: Mapped[Optional[str]] = mapped_column(Text)
  column_id: Mapped[int] = mapped_column(ForeignKey('columns.id', ondelete='CASCADE'))
  order: Mapped[int] = mapped_column(default=1)
  creator_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
  column: Mapped["Column"] = relationship(back_populates="cards")
  
  created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)