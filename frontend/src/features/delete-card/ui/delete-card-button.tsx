import { Button } from '@/shared/ui'
import useDeleteCard from '../api/use-delete-card'
import { Trash2 } from 'lucide-react'
import type { TCard } from '@/entities/card'

export default function DeleteCardButton({
	boardId,
	columnId,
	card,
}: {
	boardId: number
	columnId: number
	card: TCard
}) {
	const { mutate } = useDeleteCard(boardId)
	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={(e) => {
				e.stopPropagation() // Предотвращаем открытие модалки карточки
				mutate({ columnId, cardId: card?.id as number })
			}}
			className='h-6 w-6 shrink-0 rounded-md border-none text-slate-400 opacity-0 shadow-none transition-opacity duration-150 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600'>
			<Trash2 size={13} />
		</Button>
	)
}
