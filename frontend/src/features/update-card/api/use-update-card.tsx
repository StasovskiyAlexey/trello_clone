import { useInjection } from '@/app/providers/di-provider'
import { CardService } from '@/entities/card/api/card.service'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useUpdateCard({ boardId }: { boardId: number }) {
	const cardService = useInjection<CardService>(TTYPES.CardService)

	return useMutation({
		mutationFn: ({
			columnId,
			cardId,
			data,
		}: {
			columnId: number
			cardId: number
			data: { title: string; description: string; order: number }
		}) => cardService.updateCard(columnId, cardId, data),
		onSuccess: (data) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['board', 'boards', boardId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
