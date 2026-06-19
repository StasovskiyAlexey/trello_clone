import { Button } from '@/shared/ui'
import useDeleteUserAccount from '../api/use-delete-user-account'

export default function DeleteUserButton() {
	const { mutate } = useDeleteUserAccount()

	return (
		<Button
			onClick={() => mutate()}
			variant='destructive'
			className='w-fit rounded-lg bg-red-600 px-5 font-medium text-white shadow-sm hover:bg-red-700'>
			Удалить аккаунт навсегда
		</Button>
	)
}
