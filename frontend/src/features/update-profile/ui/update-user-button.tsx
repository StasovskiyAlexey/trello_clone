import { useModal } from '@/app/providers/modal-provider'
import { Button } from '@/shared/ui'
import useUpdateUser from '../api/use-update-profile'
import type { TUpdateUser } from '@/entities/user'

export default function UpdateUserButton({ userData }: { userData: TUpdateUser }) {
	const { switcher } = useModal()
	const { mutate } = useUpdateUser()
	return (
		<Button
			onClick={() =>
				switcher('isOpenConfirmModal', true, {
					action: () => mutate({ login: userData.login, email: userData.email }),
				})
			}
			disabled={!userData.login?.length || !userData.email?.length}
			className='w-fit rounded-lg bg-blue-600 px-5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700'>
			Обновить профиль
		</Button>
	)
}
