import { useModal } from '@/app/providers/modal-provider'
import { Button } from '@/shared/ui'
import useUpdateUserPassword from '../api/use-update-password'
import type { TUpdateUserPassword } from '@/entities/user'

export default function UpdatePasswordButton({
	userData,
	action,
}: {
	userData: TUpdateUserPassword
	action?: () => void
}) {
	const { switcher } = useModal()
	const { mutate } = useUpdateUserPassword()

	return (
		<Button
			onClick={() => {
				switcher('isOpenConfirmModal', true, {
					action: () => mutate({ password: userData.password, newPassword: userData.newPassword }),
					event: () => action?.(),
				})
			}}
			disabled={!userData.password || !userData.newPassword}
			variant='outline'
			className='w-fit rounded-lg border-slate-200 px-5 font-medium text-slate-700 hover:bg-slate-50'>
			Изменить пароль
		</Button>
	)
}
