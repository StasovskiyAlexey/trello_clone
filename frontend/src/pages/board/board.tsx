import { Button } from '@/shared/ui/button'
import { useBoard } from '@/entities/board/api/use-boards'
import { useParams, useRouter } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'
import { Column } from '@/entities/column'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import type { TColumn } from '@/entities/column'
import { CreateColumnBtn } from '@/features/create-column'
import { useReordersColumns } from '@/features/reorders-columns'
import { useReordersCards } from '@/features/reorders-cards'

export default function BoardDetail() {
	const boardId = parseInt(useParams({ strict: false }).boardId)
	const router = useRouter()

	const { data: board } = useBoard(boardId)
	console.log(board)
	const { mutate: reorderColumns } = useReordersColumns()
	const { mutate: reordersCards } = useReordersCards(boardId)

	async function handleDragEnd(result: any) {
		const { destination, source } = result
		// console.log(result)

		if (!destination) return

		if (result.type === 'column') {
			const newColumns = [...(board?.columns as TColumn[])]
			const [moved] = newColumns.splice(source.index, 1)
			newColumns.splice(destination.index, 0, moved)

			reorderColumns({ boardId, columns: newColumns })
		}

		if (result.type === 'card') {
			const cardId = Number(result.draggableId.slice(5))
			const firstColumnId = Number(source.droppableId.slice(7))
			const secondColumnId = Number(destination.droppableId.slice(7))
			const newOrder = Number(destination.index + 1)

			reordersCards({ columnId: firstColumnId, newColumnId: secondColumnId, cardId, newOrder })
		}
	}

	return (
		<>
			<section className='board'>
				<header className='flex shrink-0 items-center justify-between rounded-xl border-b border-white/10 bg-white/10 px-6 py-4 shadow-sm backdrop-blur-md'>
					<div className='flex items-center gap-4'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => router.history.back()}
							className='rounded-lgtransition-all h-8 w-8'>
							<MoveLeft size={18} />
						</Button>

						<div className='flex flex-col'>
							<h1 className='text-lg font-bold tracking-wide'>{board?.title}</h1>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<CreateColumnBtn boardId={boardId} />
					</div>
				</header>

				{/* Контекст Drag & Drop */}
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable
						type='column'
						direction='horizontal'
						droppableId='columns'>
						{(provided) => (
							// Основная рабочая область. Она занимает ровно ВСЁ оставшееся пространство (flex-1 h-full)
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}>
								{/* Заглушка, если колонок ещё нет */}
								{board?.columns?.length === 0 && (
									<div className='flex w-full shrink-0 flex-col items-start justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-4 text-center text-sm font-medium text-black backdrop-blur-sm'>
										<span>У этой доски ещё нет колонок</span>
										<span className='mt-1 text-xs'>Создайте первую, чтобы начать работу</span>
									</div>
								)}
								<div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4'>
									{board?.columns?.map((column, index) => (
										<Column
											column={column}
											key={column?.id}
											columnId={column?.id as number}
											boardId={boardId}
											index={index}
										/>
									))}
								</div>

								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</section>
		</>
	)
}
