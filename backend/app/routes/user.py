from fastapi import APIRouter, Depends, File, Response, UploadFile

from app.services.user import UserService
from ..dependencies.user import get_current_user
from app.dependencies.services import get_user_service
from ..models.user import User
from ..schemas.response import SuccessResponse
from ..schemas.user import UserCreate, UserLogin, UserPasswordRequest, UserResponse, UserUpdate, UsersListResponse

user_router = APIRouter(prefix='/api/v1/users', tags=['users'])

@user_router.get('/me', response_model=SuccessResponse[UserResponse])
async def me(user: User = Depends(get_current_user)):
  print(user)
  return SuccessResponse(
    message='Пользователь авторизован',
    data=user
  )

@user_router.get('/', response_model=SuccessResponse[UsersListResponse])
async def get_users(service: UserService = Depends(get_user_service)):
  users = await service.get_all_users()
  print(users)
  return SuccessResponse(
    data={'users': users}
  )

@user_router.get('/{user_id}', response_model=SuccessResponse[UserResponse])
async def get_user(user_id: int, service: UserService = Depends(get_user_service)):
  user = await service.get_user(user_id)
  return SuccessResponse(
    data=user
  )

@user_router.post('/register', response_model=SuccessResponse[UserResponse])
async def register_user(response: Response, user_data: UserCreate, service: UserService = Depends(get_user_service)):
  new_user, token = await service.create_user(user_data)
  
  response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=False,
    max_age=3600 * 24,
    samesite="lax"
  )

  return SuccessResponse(
    message='Пользователь успешно зарегистрирован',
    data=new_user
  )

@user_router.post('/login', response_model=SuccessResponse[UserResponse])
async def login_user(user_data: UserLogin, response: Response, service: UserService = Depends(get_user_service)):
  user, token = await service.login_user(user_data)

  response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=True,
    max_age=3600 * 24,
    samesite="lax"
  )

  return SuccessResponse(
    message='Успешный вход в аккаунт',
    data=user
  )

@user_router.post('/logout', response_model=SuccessResponse)
async def logout(response: Response, current_user = Depends(get_current_user)):
  response.delete_cookie(
    key='access_token',
    path='/',
    httponly=True,
    samesite="lax",
    secure=False
  )
  
  return SuccessResponse(
    message='Успешный выход из аккаунта'
  )

@user_router.patch('/update_user', response_model=SuccessResponse[UserResponse])
async def update_user(user_data = Depends(UserUpdate.as_form), service: UserService = Depends(get_user_service), current_user: User = Depends(get_current_user)):
  updated_user = await service.update_user(user_data, current_user)
  return SuccessResponse(
    message='Пользователь успешно обновлен',
    data=updated_user
  )

@user_router.patch('/update_user_password', response_model=SuccessResponse[UserResponse])
async def update_user_password(data: UserPasswordRequest, service: UserService = Depends(get_user_service), user: User = Depends(get_current_user)):
  updated_user = await service.update_user_password(user, data.password, data.new_password)
  return SuccessResponse(
    message='Пароль успешно изменен',
    data=updated_user
  )
  
@user_router.delete('/delete_user', response_model=SuccessResponse[UserResponse])
async def delete_user(response: Response, user: User = Depends(get_current_user), service: UserService = Depends(get_user_service)):
  deleted_user = await service.delete_user(user.id)
  print('user', user)
  response.delete_cookie(
    key='access_token',
    path='/',
    httponly=True,
    samesite="lax",
    secure=False
  )
  
  return SuccessResponse(
    message='Аккаунт успешно удален',
    data=deleted_user
  )
  
@user_router.patch('/update_user_avatar', response_model=SuccessResponse[UserResponse])
async def update_user_avatar(avatar_url: UploadFile = File(...), service: UserService = Depends(get_user_service), user = Depends(get_current_user)):
  new_user = await service.update_user_avatar(user.id, avatar_url)
  return SuccessResponse(
    message='Аватар успешно обновлен',
    data=new_user
  )