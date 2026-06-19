import DeleteUserButton from './delete-user-button'

export default function DeleteUserForm() {
	return (
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
	)
}
