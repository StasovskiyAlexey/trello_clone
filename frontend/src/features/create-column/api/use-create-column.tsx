import { useInjection } from '@/app/providers/di-provider'
import { ColumnService } from '@/entities/column/api/column.service'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useCreateColumn() {
	const columnService = useInjection<ColumnService>(TTYPES.ColumnService)

	return useMutation({
		mutationFn: ({ data, boardId }: { data: { title: string }; boardId: number }) =>
			columnService.createColumn(data.title, boardId),
		onSuccess: (data, variables) => {
			console.log(data)
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
