from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.exceptions import AppError
from app.core.utils import update_existing_entity
from app.models import Card
from app.schemas.card import CardCreate, CardUpdate
from sqlalchemy import select, update

class CardRepository:
  def __init__(self, db: AsyncSession):
    self.db = db
    
  async def get_all_cards(self, column_id: int):
    query = (select(Card)).filter_by(column_id=column_id)
    cards = await self.db.scalars(query)
    return cards.all()
  
  
  async def get_card_by_id(self, card_id: int, column_id: int):
    query = (select(Card)).filter_by(id=card_id, column_id=column_id)
    card = await self.db.scalar(query)
    return card
  

  async def get_card_by_column(self, column_id: int):
    query = select(Card).where(Card.column_id == column_id)
    card = await self.db.execute(query)
    return card.scalar_one_or_none()
  
  async def get_card_by_title(self, card_title: str, column_id: int):
    query = select(Card).where(Card.title == card_title, Card.column_id == column_id)
    card = await self.db.execute(query)
    return card.scalar_one_or_none()
  
  async def create_card(self, card: CardCreate, column_id: int, creator_id: int):
    query = select(Card).filter_by(column_id=column_id, creator_id=creator_id).order_by(Card.order.desc()).limit(1)
    entities = await self.db.execute(query)
    last_order = entities.scalars().first()

    order = (last_order.order + 1) if last_order is not None else 1
    
    new_card = Card(title=card.title, description=card.description, column_id=column_id, order=order, creator_id=creator_id)
    self.db.add(new_card)
    
    try:
      await self.db.commit()
      query = (select(Card).where(Card.id == new_card.id))
      result = await self.db.execute(query)
      return result.scalar_one()
    except Exception as e:
      await self.db.rollback()
      raise AppError(400, f'{e}')
  
  async def update_card(self, card_id: int, column_id: int, card_update: CardUpdate, user_id: int):
    exist_card = await self.get_card_by_id(card_id, column_id)

    if exist_card is None:
      raise AppError(400, 'Картки не знайдено')
    
    if user_id is not None:
      if exist_card.creator_id != user_id:
        raise AppError(403, 'Ви не можете редагувати чужу картку')
    
    updated_data = card_update.model_dump(exclude_unset=False)
    
    for key, value in updated_data.items():
      setattr(exist_card, key, value)
      
    return await update_existing_entity(self, exist_card, 'Помилка під час оновлення картки')
  
  async def reorder_cards(self, column_id: int, new_column_id: int, card_id: int, new_order: int):
    # Открываем соединение с БД(транзакцию)
    async with self.db.begin():
      
      # Создаем запрос и находим карточку по ID
      card_query = await self.db.execute(select(Card).filter_by(id=card_id))
      card = card_query.scalar_one_or_none()
      
      if card is None:
        raise AppError(400, 'Такої картки не знайдено')
      
      # 1. Если перетаскиваем карточку в новую колонку
      if column_id != new_column_id:
      
        # Уменьшаем порядок у всех карточек в СТАРОЙ колонке, которые стояли ПОСЛЕ перемещаемой
        await self.db.execute(update(Card).where(Card.column_id == column_id, Card.order > card.order).values(order=Card.order - 1))
        # Увеличиваем порядок у всех карточек в НОВОЙ колонке, которые стоят на позиции new_order или позже
        await self.db.execute(update(Card).where(Card.column_id == new_column_id, Card.order >= new_order).values(order=Card.order + 1))
      
      # 2. Если перетаскиваем карточку в текущую колонку
      else:
        # Если перетаскиваем ВНИЗ (в конец списка)
        if card.order < new_order:
          
          # Здесь находим карточку по ID первой колонки, с условием что порядок карточки больше первой найденой карточки, уменьшаем порядок на один
          await self.db.execute(update(Card).where(Card.column_id == column_id, Card.order > card.order, Card.order <= new_order).values(order=Card.order - 1))
          
        # Если перетаскиваем ВВЕРХ (в начало списка)
        elif card.order > new_order:
          
          # Здесь находим карточку по ID второй колонки, с условием что порядок карточки больше или равно найденой карточки, увеличиваем порядок на один
          await self.db.execute(update(Card).where(Card.column_id == new_column_id, Card.order >= new_order, Card.order < card.order).values(order=Card.order + 1))
    
      # Устанавливаем новые данные в карточку
      card.column_id = new_column_id
      card.order = new_order
      
      await self.db.flush()

    return card
  
  async def delete_card(self, card: Card):
    try:
      await self.db.delete(card)
      await self.db.commit()
      return card
    except:
      await self.db.rollback()
      raise AppError(500, 'Ошибка при удалении карточки')