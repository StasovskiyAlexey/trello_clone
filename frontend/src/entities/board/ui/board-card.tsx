import { parseData } from '@/shared/lib/utils'
import type { TBoard } from '../model/types'
import { Link } from '@tanstack/react-router'
import { Calendar, Layers, Layout, MoreVertical, SquarePen } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui'
import { memo } from 'react'
import { useModal } from '@/app/providers/modal-provider'
import { DropdownDeleteBoardItem } from '@/features/delete-board'

function BoardCard({ board }: { board: TBoard }) {
	const { switcher } = useModal()

	return (
		<>
			<div className='group relative flex h-44 w-full max-w-95 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50/50'>
				{/* Кнопка меню — плавно появляется при наведении, без лишних подложек */}
				<div className='absolute top-3 right-3 z-20 opacity-0 transition-opacity duration-150 group-hover:opacity-100'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200/70 hover:text-gray-700'>
								<MoreVertical size={16} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='w-48 border-gray-200 bg-white text-gray-700'>
							<DropdownMenuGroup>
								<DropdownMenuItem
									className='flex cursor-pointer items-center gap-2 text-xs focus:bg-gray-100 focus:text-gray-900'
									onSelect={() => switcher('isOpenUpdateBoard', true, { board })}>
									<SquarePen
										size={14}
										className='text-gray-500'
									/>
									<span>Редактировать</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator className='bg-gray-100' />
								<DropdownDeleteBoardItem board={board} />
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Ссылка на всю карточку */}
				<Link
					to={`/boards/${board?.id}`}
					className='absolute inset-0 z-10'
				/>

				{/* Контент: Название и Иконка в одну линию, как в Trello */}
				<div className='flex items-start gap-3'>
					<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors duration-200 group-hover:bg-gray-200 group-hover:text-gray-700'>
						<Layout size={16} />
					</div>
					<div className='pr-4'>
						<h2 className='line-clamp-2 text-sm font-semibold tracking-tight text-gray-800 transition-colors duration-200 group-hover:text-gray-900'>
							{board?.title}
						</h2>
					</div>
				</div>

				{/* Нижняя панель: Инфо-плашки */}
				<div className='flex items-center justify-between border-t border-gray-100 pt-3'>
					<div className='flex items-center gap-1 text-xs font-medium text-gray-500'>
						<Layers
							size={13}
							className='text-gray-400'
						/>
						<span>{board?.columns?.length || 0} колонок</span>
					</div>

					<div className='flex items-center gap-1 text-[10px] font-medium tracking-wider text-gray-400 uppercase'>
						<Calendar size={11} />
						<span>{parseData(board?.created_at)}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(BoardCard)
