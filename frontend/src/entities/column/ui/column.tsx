import { GripVertical, MoreVertical, Plus, SquarePen, Trash } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useColumnMutations } from '@/entities/column/api/use-columns'
import useModalStore from '@/store/modal.store'
import type { TColumn } from '@/types/kanban'
import Card from '../../card/ui/card'
import { Button } from '@/shared/ui/button'
import { memo } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

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
	const { deleteColumn } = useColumnMutations()
	const switcher = useModalStore((state) => state.switcher)

	return (
		<Draggable
			draggableId={`column-${column?.id}`}
			index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className='flex h-max max-h-180 min-h-20 w-80 shrink-0 flex-col rounded-xl border border-slate-200 bg-slate-100 shadow-sm'>
					<div className='group flex items-center justify-between p-4'>
						<div className='flex items-center gap-2'>
							<div {...provided.dragHandleProps}>
								<GripVertical
									className='cursor-grab text-slate-400 opacity-0 transition-opacity group-hover:opacity-100'
									size={16}
								/>
							</div>
							<h2 className='font-semibold text-slate-700'>{column?.title}</h2>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='p-1 text-gray-400 hover:text-gray-600'>
									<MoreVertical size={18} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									<DropdownMenuItem
										className='cursor-pointer'
										onSelect={() => deleteColumn({ columnId, boardId })}>
										<Trash size={15} /> Видалити колонку
									</DropdownMenuItem>
									<DropdownMenuItem
										className='cursor-pointer'
										onSelect={() => switcher('isOpenUpdateColumn', true, { column, boardId })}>
										<SquarePen size={15} /> Оновити колонку
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Droppable
						droppableId={`column-${column?.id}`}
						type='card'>
						{(provided) => (
							<div
								ref={provided.innerRef}
								className='flex-1 space-y-3 overflow-y-auto px-3 pb-3'>
								{!column?.cards?.length && 'Додайте картку...'}
								<div
									className='flex flex-col gap-4'
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
							</div>
						)}
					</Droppable>

					<Button
						onClick={() => switcher('isOpenCreateCard', true, { columnId, boardId })}
						className='m-3 flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm transition-colors hover:bg-indigo-600'>
						<Plus size={16} />
						<span>Додати картку</span>
					</Button>
				</div>
			)}
		</Draggable>
	)
}

export default memo(ColumnCard)
