import { Separator } from '@/shared/ui/separator'
import { UpdatePasswordForm } from '@/features/update-password'
import { DeleteUserButton } from '@/features/delete-profile'
import { UpdateUserForm } from '@/features/update-profile'

// const UpdateUserAvatarModal = lazy(() => import('@/entities/user/ui/modals/update-user-avatar-modal'))

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
						<div className='space-y-4 rounded-xl border border-red-200 bg-red-50/50 p-6 shadow-sm'>
							<div>
								<h3 className='text-lg font-semibold text-red-800'>Опасная зона</h3>
								<p className='mt-0.5 text-sm text-red-600'>
									После удаления аккаунта все ваши личные доски, карточки и история активности будут стерты навсегда.
								</p>
							</div>
							<div className='pt-2'>
								<DeleteUserButton />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings
