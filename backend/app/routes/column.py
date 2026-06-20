from fastapi import APIRouter, Depends
from app.schemas.response import SuccessResponse
from app.schemas.column import ColumnResponse, ColumnUpdate, ColumnCreate, ColumnOrderUpdate, ColumnOrdersUpdateList
from app.models import User
from app.services import ColumnService
from app.dependencies.services import get_column_service
from app.dependencies.user import get_current_user

column_router = APIRouter(prefix='/api/v1/column', tags=['columns'])

@column_router.get('/get_columns', response_model=SuccessResponse[list[ColumnResponse]])
async def get_columns(board_id: int, user: User = Depends(get_current_user), service: ColumnService = Depends(get_column_service)):
  columns = await service.get_all_columns(board_id, user.id)
  return SuccessResponse(
    data=columns
  )

@column_router.post('/get_column_by_id', response_model=SuccessResponse[ColumnResponse])
async def get_column(board_id: int, column_id: int, service: ColumnService = Depends(get_column_service)):
  column = await service.get_column_by_id(column_id, board_id)
  return SuccessResponse(
    data=column
  )

@column_router.post('/create_column', response_model=SuccessResponse[ColumnResponse])
async def create_column(column_data: ColumnCreate, service: ColumnService = Depends(get_column_service)):
  new_column = await service.create_column(column_data)
  return SuccessResponse(
    message='Новую колонку успешно создано',
    data=new_column
  )
  
@column_router.patch('/update_column', response_model=SuccessResponse[ColumnResponse])
async def update_column(column_id: int, board_id: int, column_data: ColumnUpdate, service: ColumnService = Depends(get_column_service)):
  new_column = await service.update_column(column_id, column_data, board_id)
  return SuccessResponse(
    message='Колонка успешно обновлена',
    data=new_column
  )
  
@column_router.patch('/update_order_columns', response_model=SuccessResponse[list[ColumnOrderUpdate]])
async def update_order_columns(board_id: int, column_data: ColumnOrdersUpdateList, service: ColumnService = Depends(get_column_service), user: User = Depends(get_current_user)):
  updated_columns = await service.reorder_all_columns(board_id, user.id, column_data)
  print(updated_columns)
  return SuccessResponse(
    data=updated_columns
  )
  
@column_router.delete('/delete_column', response_model=SuccessResponse[ColumnResponse])
async def delete_column(board_id: int, column_id: int, service: ColumnService = Depends(get_column_service)):
  deleted_column = await service.delete_column(column_id, board_id)
  return SuccessResponse(
    message='Колонка успешно удалена',
    data=deleted_column
  )