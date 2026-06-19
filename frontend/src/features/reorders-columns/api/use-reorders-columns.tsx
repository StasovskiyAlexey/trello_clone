import { useInjection } from '@/app/providers/di-provider'
import type { ColumnService, TColumn } from '@/entities/column'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useReordersColumns() {
	const columnService = useInjection<ColumnService>(TTYPES.ColumnService)

	return useMutation({
		mutationFn: ({ boardId, columns }: { boardId: number; columns: TColumn[] }) =>
			columnService.reorderColumns(boardId, columns),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
