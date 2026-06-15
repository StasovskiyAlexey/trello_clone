import ScreenLoader from '@/shared/screen-loader'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Separator } from '@/shared/ui/separator'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { getImageUrl } from '@/shared/lib/utils'
import useModalStore from '@/store/modal.store'
import { useUsers } from '@/entities/user/api/use-users'
import { useCheckAuth } from '@/app/hooks/queries/useAuth'

const UpdateUserAvatarModal = lazy(() => import('@/entities/user/ui/modals/update-user-avatar-modal'))
const ConfirmModal = lazy(() => import('@/widgets/modals/confrim-modal'))

function Settings() {
	const navigate = useNavigate()
	const switcher = useModalStore((state) => state.switcher)

	const { updateUserPassword, deleteUser, updateUserData } = useUsers()
	const { data: user, isLoading } = useCheckAuth()

	const userDefaultObj: {
		id?: number
		login?: string
		email?: string
		password?: string
		newPassword?: string
		avatarUrl?: string | null
	} = {
		id: user?.id,
		login: user?.login,
		email: user?.email,
		password: '',
		newPassword: '',
		avatarUrl: user?.avatar_url,
	}

	const [userData, setUserData] = useState<{
		login?: string
		email?: string
		password?: string
		newPassword?: string
		avatarUrl?: string | null
	}>(userDefaultObj)

	useEffect(() => {
		setUserData((state) => ({ ...state, email: user?.email, login: user?.login, avatarUrl: user?.avatar_url }))
	}, [user])

	const updateUser = async () => {
		if (!userData.login && !userData.email && !userData.avatarUrl) return
		await updateUserData({
			login: userData?.login,
			email: userData.email,
			avatarUrl: null,
		})
	}

	const updatePassword = async () => {
		await updateUserPassword({ password: userData.password, newPassword: userData.newPassword })
		setUserData((state) => ({ ...state, password: '', newPassword: '' }))
	}

	const deleteUserAccount = async () => {
		await deleteUser()
		setUserData(userDefaultObj)
		navigate({
			to: '/auth',
		})
	}

	if (isLoading) {
		return <ScreenLoader />
	}

	return (
		<>
			<div className='mx-auto h-full w-full flex-1 font-sans'>
				<div className='container'>
					<header>
						<h2 className='text-3xl font-extrabold tracking-tight text-slate-900'>Настройки аккаунта</h2>
						<p className='mt-1 text-sm text-slate-500'>
							Управляйте своими личными данными, безопасностью профиля и настройками канбан-досок.
						</p>
					</header>

					<Separator className='my-3 bg-slate-200' />

					<div className='space-y-8 pb-4'>
						{/* КАРТОЧКА 1: Публичные данные */}
						<div className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
							<div className='flex flex-col gap-6 border-b border-slate-100 pb-4 sm:flex-row sm:items-center'>
								{/* Блок Аватара в стиле Trello */}
								<div className='group relative w-max cursor-pointer'>
									<div className='absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
										<Plus className='h-6 w-6 text-white' />
									</div>
									<div className='absolute -right-1 -bottom-1 z-20'>
										<Button
											size='icon'
											onClick={() => switcher('isOpenUpdateAvatar', true)}
											className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-md hover:bg-blue-700'>
											<Plus className='h-4 w-4 text-white' />
										</Button>
									</div>
									<Avatar
										className='z-0 h-24 w-24 ring-4 ring-slate-100'
										size='lg'>
										<AvatarImage
											src={
												!user?.avatar_url
													? 'https://img.icons8.com/ios-filled/100/user-male-circle.png'
													: getImageUrl(user?.avatar_url)
											}
										/>
										<AvatarFallback className='bg-blue-100 font-bold text-blue-700'>U</AvatarFallback>
									</Avatar>
								</div>

								<div>
									<h3 className='text-lg font-semibold text-slate-800'>Публичные данные</h3>
									<p className='mt-0.5 text-sm text-slate-500'>
										Эта информация будет видна другим участникам ваших досок и команд.
									</p>
								</div>
							</div>

							{/* Поля формы */}
							<div className='grid max-w-xl gap-5'>
								<div className='grid gap-2'>
									<Label
										htmlFor='login'
										className='text-sm font-semibold text-slate-700'>
										Логин
									</Label>
									<Input
										value={userData.login || ''}
										onChange={(e) => setUserData((state) => ({ ...state, login: e.target.value }))}
										id='login'
										placeholder='Ваш уникальный логин'
										className='border-slate-200 focus-visible:ring-blue-500'
									/>
								</div>
								<div className='grid gap-2'>
									<Label
										htmlFor='email'
										className='text-sm font-semibold text-slate-700'>
										Email
									</Label>
									<Input
										value={userData.email || ''}
										onChange={(e) => setUserData((state) => ({ ...state, email: e.target.value }))}
										id='email'
										type='email'
										placeholder='name@example.com'
										className='border-slate-200 focus-visible:ring-blue-500'
									/>
								</div>
								<Button
									onClick={() =>
										switcher('isOpenConfirmModal', true, {
											action: () => updateUser(),
											confirmLabel: 'Обновить пользователя',
										})
									}
									disabled={!userData.login?.length || !userData.email?.length}
									className='w-fit rounded-lg bg-blue-600 px-5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700'>
									Обновить профиль
								</Button>
							</div>
						</div>

						{/* КАРТОЧКА 2: Безопасность / Пароль */}
						<div className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
							<div className='border-b border-slate-100 pb-4'>
								<h3 className='text-lg font-semibold text-slate-800'>Безопасность</h3>
								<p className='mt-0.5 text-sm text-slate-500'>
									Используйте надежный пароль, чтобы защитить свои рабочие пространства.
								</p>
							</div>

							<div className='grid max-w-xl gap-5'>
								<div className='grid gap-2'>
									<Label
										htmlFor='current-password'
										className='text-sm font-semibold text-slate-700'>
										Текущий пароль
									</Label>
									<Input
										value={userData.password || ''}
										onChange={(e) => setUserData((prevState) => ({ ...prevState, password: e.target.value }))}
										placeholder='Введите действующий пароль'
										id='current-password'
										type='password'
										className='border-slate-200 focus-visible:ring-blue-500'
									/>
								</div>
								<div className='grid gap-2'>
									<Label
										htmlFor='new-password'
										className='text-sm font-semibold text-slate-700'>
										Новый пароль
									</Label>
									<Input
										value={userData.newPassword || ''}
										onChange={(e) => setUserData((prevState) => ({ ...prevState, newPassword: e.target.value }))}
										placeholder='Придумайте новый сложный пароль'
										id='new-password'
										type='password'
										className='border-slate-200 focus-visible:ring-blue-500'
									/>
								</div>
								<Button
									onClick={() =>
										switcher('isOpenConfirmModal', true, { confirmLabel: 'Изменить пароль', action: updatePassword })
									}
									disabled={!userData.password || !userData.newPassword}
									variant='outline'
									className='w-fit rounded-lg border-slate-200 px-5 font-medium text-slate-700 hover:bg-slate-50'>
									Изменить пароль
								</Button>
							</div>
						</div>

						{/* КАРТОЧКА 3: Опасная зона (Удаление) */}
						<div className='space-y-4 rounded-xl border border-red-200 bg-red-50/50 p-6 shadow-sm'>
							<div>
								<h3 className='text-lg font-semibold text-red-800'>Опасная зона</h3>
								<p className='mt-0.5 text-sm text-red-600'>
									После удаления аккаунта все ваши личные доски, карточки и история активности будут стерты навсегда.
								</p>
							</div>
							<div className='pt-2'>
								<Button
									onClick={deleteUserAccount}
									variant='destructive'
									className='w-fit rounded-lg bg-red-600 px-5 font-medium text-white shadow-sm hover:bg-red-700'>
									Удалить аккаунт безвозвратно
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <Suspense fallback={<ScreenLoader/>}>
      <ConfirmModal/>
      <UpdateUserAvatarModal/>
    </Suspense> */}
		</>
	)
}

export default Settings
