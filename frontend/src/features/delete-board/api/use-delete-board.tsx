import { useInjection } from '@/app/providers/di-provider'
import type { BoardService } from '@/entities/board'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useDeleteBoard() {
	const boardsService = useInjection<BoardService>(TTYPES.BoardService)

	return useMutation({
		mutationFn: (id: number) => boardsService.deleteBoard(id),
		onSuccess: (data) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['boards'] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.success(error.response?.data.detail)
			}
		},
	})
}
