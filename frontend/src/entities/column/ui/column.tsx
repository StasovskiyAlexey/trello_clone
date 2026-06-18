import { GripVertical, MoreVertical } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui'
import type { TColumn } from '../model/types'
import { Card } from '@/entities/card'
import { memo } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { UpdateColumnDropdownItem } from '@/features/update-column'
import { ColumnDropdownDeleteItem } from '@/features/delete-column'
import { CreateCardButton } from '@/features/create-card'

function ColumnCard({
	column,
	boardId,
	columnId,
	index,
}: {
	column: TColumn
	boardId: number
	columnId: number
	index: number
}) {
	return (
		<Draggable
			draggableId={`column-${column?.id}`}
			index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className='flex max-h-[80vh] w-72 shrink-0 flex-col rounded-xl border border-slate-200/60 bg-[#f1f2f4] text-slate-800 shadow-sm'>
					{/* Шапка колонки */}
					<div className='group flex items-center justify-between p-3 pb-1'>
						<div className='flex min-w-0 flex-1 items-center gap-1.5'>
							{/* Иконка перетаскивания колонки */}
							<div
								{...provided.dragHandleProps}
								className='shrink-0'>
								<GripVertical
									className='cursor-grab text-slate-400 opacity-0 transition-opacity group-hover:opacity-100'
									size={14}
								/>
							</div>
							{/* Название колонки */}
							<h2 className='truncate px-1 py-0.5 text-sm font-semibold text-[#172b4d]'>{column?.title}</h2>
						</div>

						{/* Меню действий */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-800'>
									<MoreVertical size={16} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align='start'
								className='w-56'>
								<DropdownMenuGroup>
									<UpdateColumnDropdownItem
										boardId={boardId}
										column={column}
									/>
									<DropdownMenuSeparator />
									<ColumnDropdownDeleteItem
										boardId={boardId}
										columnId={columnId}
									/>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Зона для карточек (Droppable) */}
					<Droppable
						droppableId={`column-${column?.id}`}
						type='card'>
						{(provided) => (
							<div
								ref={provided.innerRef}
								className='custom-scrollbar flex-1 overflow-y-auto px-2 py-1'>
								<div
									className='flex flex-col gap-2 pb-2'
									{...provided.droppableProps}>
									{column?.cards &&
										column?.cards?.map((card, index) => (
											<Card
												boardId={boardId}
												key={card?.id}
												card={card}
												columnId={columnId}
												index={index}
											/>
										))}

									{provided.placeholder}
								</div>

								{/* Заглушка, если пусто */}
								{!column?.cards?.length && (
									<p className='px-2 py-3 text-xs font-medium text-slate-400 italic'>
										Нет карточек. Добавьте первую...
									</p>
								)}
							</div>
						)}
					</Droppable>

					{/* Кнопка «Добавить карточку» внизу колонки */}
					<div className='p-2 pt-0'>
						<CreateCardButton
							columnId={columnId}
							boardId={boardId}
						/>
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default memo(ColumnCard)
