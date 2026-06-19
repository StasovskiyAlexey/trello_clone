import { getImageUrl, parseData } from '@/shared/lib/utils'
import type { TCard } from '../model/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'
import { AlignLeft, Calendar } from 'lucide-react'
import { Draggable } from '@hello-pangea/dnd'
import { useAuth } from '@/app/providers/auth-provider'
import { useModal } from '@/app/providers/modal-provider'
import { DeleteCardButton } from '@/features/delete-card'

export default function Card({
	boardId,
	card,
	columnId,
	index,
}: {
	boardId: number
	card: TCard
	columnId: number
	index: number
}) {
	const { user } = useAuth()
	const { switcher } = useModal()

	return (
		<Draggable
			draggableId={`card-${card?.id}`}
			index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onClick={() => switcher('isOpenUpdateCard', true, { card, columnId, boardId })}
					// Убрали фиолетовые акценты, добавили мягкую смену рамки и Trello-тень
					className='group relative flex cursor-pointer flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all duration-150 hover:border-slate-300 hover:shadow-md active:cursor-grabbing'>
					{/* Верхний блок: Название и скрытая кнопка меню/удаления */}
					<div className='flex items-start justify-between gap-2'>
						<h3 className='flex-1 text-sm leading-snug font-medium wrap-break-word text-[#172b4d]'>{card?.title}</h3>

						{/* Кнопка удаления аккуратно вписана в правый угол и появляется при наведении */}
						<DeleteCardButton
							card={card}
							boardId={boardId}
							columnId={columnId}
						/>
					</div>

					{/* Индикатор наличия описания (как в оригинальном Trello) */}
					{card?.description && (
						<div
							className='flex items-center text-slate-400'
							title='Эта карточка с описанием.'>
							<AlignLeft size={14} />
						</div>
					)}

					{/* Нижняя панель: Исполнитель и Дата */}
					<div className='mt-1 flex items-center justify-between border-t border-slate-100/80 pt-2.5'>
						{/* Исполнитель */}
						<div className='flex min-w-0 items-center gap-1.5'>
							<Avatar className='h-5 w-5 shrink-0 ring-1 ring-slate-100'>
								<AvatarImage src={getImageUrl(user?.avatar_url)} />
								<AvatarFallback className='bg-slate-100 text-[9px] font-bold text-slate-600'>
									{user?.login?.substring(0, 2).toUpperCase() || '??'}
								</AvatarFallback>
							</Avatar>
							<span className='truncate text-[11px] font-medium text-slate-500'>{user?.login?.split(' ')[0]}</span>
						</div>

						{/* Дата */}
						<div className='flex shrink-0 items-center gap-1 text-slate-400'>
							<Calendar size={11} />
							<span className='text-[10px] font-medium'>{parseData(card?.created_at)}</span>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	)
}
