import { useInjection } from '@/app/providers/di-provider'
import type { TUpdateUserAvatar, UserService } from '@/entities/user'
import { TTYPES } from '@/shared/di/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateUser() {
	const userService = useInjection<UserService>(TTYPES.UserService)

	return useMutation({
		mutationFn: (data: TUpdateUserAvatar) => userService.updateUserData(data),
		onSuccess: (data) => {
			toast.success(data.message)
			return data.data
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
