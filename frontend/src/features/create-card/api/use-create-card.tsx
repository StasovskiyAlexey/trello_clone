import { useInjection } from '@/app/providers/di-provider'
import { CardService } from '@/entities/card/api/card.service'
import { TTYPES } from '@/shared/di/types'
import { queryClient } from '@/shared/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export default function useCreateCard() {
	const cardService = useInjection<CardService>(TTYPES.CardService)

	return useMutation({
		mutationFn: ({
			columnId,
			data,
		}: {
			boardId: number
			columnId: number
			data: { title: string; description: string }
		}) => cardService.createCard(columnId, data),
		onSuccess: (data, variables) => {
			toast.success(data.message)
			queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.detail)
			}
		},
	})
}
