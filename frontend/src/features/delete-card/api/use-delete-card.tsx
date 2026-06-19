import { useInjection } from '@/app/providers/di-provider'
import type { CardService } from '@/entities/card/api/card.service'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useDeleteCard(boardId: number) {
	const cardService = useInjection<CardService>(TTYPES.CardService)

	return useMutation({
		mutationFn: ({ columnId, cardId }: { columnId: number; cardId: number }) =>
			cardService.deleteCard(columnId, cardId),
		onSuccess: (data) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['board', boardId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
