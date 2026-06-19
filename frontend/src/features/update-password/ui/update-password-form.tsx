import type { TUpdateUserPassword } from '@/entities/user'
import { Input, Label } from '@/shared/ui'
import { useState } from 'react'
import UpdatePasswordButton from './update-password-button'

export default function UpdatePasswordForm() {
	const [userData, setUserData] = useState<TUpdateUserPassword>({
		password: '',
		newPassword: '',
	})

	return (
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
				<UpdatePasswordButton
					action={() => setUserData((state) => ({ ...state, password: '', newPassword: '' }))}
					userData={{ password: userData.password, newPassword: userData.newPassword }}
				/>
			</div>
		</div>
	)
}
