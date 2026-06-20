from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db import Base

class User(Base):
  __tablename__ = "users"

  id: Mapped[int] = mapped_column(primary_key=True)
  login: Mapped[str] = mapped_column(String(100), index=True)
  email: Mapped[str] = mapped_column(unique=True, index=True)
  password: Mapped[str] = mapped_column(nullable=False)
  avatar_url: Mapped[str | None] = mapped_column(String(256), nullable=True)