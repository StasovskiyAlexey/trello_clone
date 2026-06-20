from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from typing import List
from app.core.db import Base

class Column(Base):
  __tablename__ = 'columns'
  
  id: Mapped[int] = mapped_column(primary_key=True, index=True)
  title: Mapped[str] = mapped_column(nullable=False)
  board_id: Mapped[int] = mapped_column(ForeignKey('boards.id', ondelete="CASCADE"))
  board: Mapped['Board'] = relationship('Board', back_populates='columns')
  order: Mapped[int] = mapped_column(default=1)
  cards: Mapped[List["Card"]] = relationship(back_populates="column", cascade='all, delete-orphan', order_by="Card.order")