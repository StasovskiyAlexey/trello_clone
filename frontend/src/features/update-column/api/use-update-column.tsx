import { useInjection } from '@/app/providers/di-provider'
import { ColumnService } from '@/entities/column/api/column.service'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateColumn() {
	const columnService = useInjection<ColumnService>(TTYPES.ColumnService)

	return useMutation({
		mutationFn: ({
			data,
			columnId,
			boardId,
		}: {
			data: { title: string; order: number }
			columnId: number
			boardId: number
		}) => columnService.updateColumn(data.title, data.order, columnId, boardId),
		onSuccess: (data, variables) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.success(error.response?.data.detail)
			}
		},
	})
}
