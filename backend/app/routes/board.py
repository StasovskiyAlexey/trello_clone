from fastapi import APIRouter, Depends
from app.dependencies.user import get_current_user
from app.dependencies.services import get_board_service
from app.schemas.response import SuccessResponse
from app.schemas.board import BoardResponse, BoardCreate, BoardUpdate
from app.services import BoardService
from app.models import User

board_router = APIRouter(prefix='/api/v1/boards', tags=['boards'])

@board_router.get('/get_boards', response_model=SuccessResponse[list[BoardResponse]])
async def get_boards(user: User = Depends(get_current_user), service: BoardService = Depends(get_board_service)):
  boards = await service.get_all_boards(user.id)
  return SuccessResponse(
    data=boards
  )

@board_router.post('/get_board_by_id', response_model=SuccessResponse[BoardResponse])
async def get_board_by_id(board_id: int, user: User = Depends(get_current_user), service: BoardService = Depends(get_board_service)):
  board = await service.get_board_by_id(user.id, board_id)
  return SuccessResponse(
    data=board
  )

@board_router.post('/create_board', response_model=SuccessResponse[BoardResponse])
async def create_board(board: BoardCreate, user: User = Depends(get_current_user), service: BoardService = Depends(get_board_service)):
  new_board = await service.create_board(user.id, board)
  return SuccessResponse(
    message='Доска успешно создана',
    data=new_board
  )
  
@board_router.patch('/update_board', response_model=SuccessResponse[BoardResponse])
async def update_board(board_id: int, board: BoardUpdate, user: User = Depends(get_current_user), service: BoardService = Depends(get_board_service)):
  updated_board = await service.update_board(user.id, board_id, board)
  return SuccessResponse(
    message='Доска успешно обновлена',
    data=updated_board
  )
  
@board_router.delete('/delete_board', response_model=SuccessResponse[BoardResponse])
async def delete_board(board_id: int, user: User = Depends(get_current_user), service: BoardService = Depends(get_board_service)):
  deleted_board = await service.delete_board(user.id, board_id)
  return SuccessResponse(
    message='Доска успешно удалена',
    data=deleted_board
  )