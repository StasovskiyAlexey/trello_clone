import { useAuth } from '@/app/providers/auth-provider'
import type { TUpdateUser } from '@/entities/user'
import { Input, Label } from '@/shared/ui'
import { useState } from 'react'
import UpdateUserButton from './update-user-button'
import UpdateUserAvatarButton from './update-user-avatar-button'

export default function UpdateUserForm() {
	const { user } = useAuth()

	const [userData, setUserData] = useState<TUpdateUser>({
		login: user?.login,
		email: user?.email,
		avatarUrl: user?.avatar_url,
	})

	return (
		<div className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
			<div className='flex flex-col gap-6 border-b border-slate-100 pb-4 sm:flex-row sm:items-center'>
				{/* Блок Аватара в стиле Trello */}
				<UpdateUserAvatarButton />

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
				<UpdateUserButton userData={userData} />
			</div>
		</div>
	)
}
