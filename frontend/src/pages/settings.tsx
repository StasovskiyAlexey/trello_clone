import { Separator } from '@/shared/ui/separator'
import { UpdatePasswordForm } from '@/features/update-password'
import { DeleteUserForm } from '@/features/delete-profile'
import { UpdateUserForm } from '@/features/update-profile'

function Settings() {
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
						<UpdateUserForm />

						{/* КАРТОЧКА 2: Безопасность / Пароль */}
						<UpdatePasswordForm />

						{/* КАРТОЧКА 3: Опасная зона (Удаление) */}
						<DeleteUserForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings
