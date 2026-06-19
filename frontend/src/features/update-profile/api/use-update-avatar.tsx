import { useInjection } from '@/app/providers/di-provider'
import { UserService } from '@/entities/user'
import { TTYPES } from '@/shared/di/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateAvatar() {
	const userService = useInjection<UserService>(TTYPES.UserService)

	return useMutation({
		mutationFn: (data: { avatarUrl?: File | null }) => userService.updateUserAvatar(data.avatarUrl),
		onSuccess: (data) => {
			toast.success(data.message)
			return data
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
