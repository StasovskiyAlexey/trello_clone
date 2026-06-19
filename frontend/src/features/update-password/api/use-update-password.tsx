import { useInjection } from '@/app/providers/di-provider'
import type { TUpdateUserPassword } from '@/entities/user'
import { UserService } from '@/entities/user/api/user.service'
import { TTYPES } from '@/shared/di/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateUserPassword() {
	const userService = useInjection<UserService>(TTYPES.UserService)

	return useMutation({
		mutationFn: (data: TUpdateUserPassword) =>
			userService.updatePassword({ password: data.password, newPassword: data.newPassword }),
		onSuccess: (data) => {
			toast.success(data.message)
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
