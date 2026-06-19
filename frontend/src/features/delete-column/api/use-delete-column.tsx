import { useInjection } from '@/app/providers/di-provider'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '@/shared/lib/query-client'
import { AxiosError } from 'axios'
import type { ColumnService } from '@/entities/column'
import { TTYPES } from '@/shared/di/types'

export default function useDeleteColumn() {
	const columnService = useInjection<ColumnService>(TTYPES.ColumnService)

	return useMutation({
		mutationFn: ({ columnId, boardId }: { columnId: number; boardId: number }) =>
			columnService.deleteColumn(boardId, columnId),
		onSuccess: (data, variables) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
			queryClient.removeQueries({ queryKey: ['board', variables.columnId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.success(error.response?.data.detail)
			}
		},
	})
}
