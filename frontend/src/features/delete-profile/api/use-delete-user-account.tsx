import { useInjection } from '@/app/providers/di-provider'
import { UserService } from '@/entities/user/api/user.service'
import { TTYPES } from '@/shared/di/types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/app/providers/auth-provider'

export default function useDeleteUserAccount() {
	const userService = useInjection<UserService>(TTYPES.UserService)
	const { setUser } = useAuth()

	const navigate = useNavigate()
	return useMutation({
		mutationFn: () => userService.deleteAccount(),
		onSuccess: (data) => {
			console.log(data)
			toast.success(data.message)
			setUser(null)
			navigate({ to: '/auth' })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
