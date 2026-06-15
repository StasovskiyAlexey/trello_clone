import { parseData } from '@/shared/lib/utils'
import type { TBoard } from '@/types/kanban'
import { Link } from '@tanstack/react-router'
import { Calendar, Layers, Layout, MoreVertical, SquarePen, Trash } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useBoardMutations } from '@/entities/board/api/use-boards'
import useModalStore from '@/store/modal.store'
import { memo } from 'react'

function BoardCard({ board }: { board: TBoard }) {
	const { deleteBoard } = useBoardMutations()
	const switcher = useModalStore((state) => state.switcher)

	return (
		<>
			<div className='group relative flex min-h-45 min-w-85 flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl'>
				<div className='absolute right-3 z-20'>
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
									onSelect={() => deleteBoard(board?.id as number)}>
									<Trash size={15} /> Видалити дошку
								</DropdownMenuItem>
								<DropdownMenuItem
									className='cursor-pointer'
									onSelect={() => switcher('isOpenUpdateBoard', true, { board })}>
									<SquarePen size={15} /> Оновити дошку
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<Link
					to={`/boards/${board?.id}`}
					className='absolute inset-0 z-10'
				/>

				<div>
					<div className='mb-4 flex items-start justify-between'>
						<div className='rounded-lg bg-gray-50 p-2 transition-colors duration-300 group-hover:bg-black group-hover:text-white'>
							<Layout size={20} />
						</div>
					</div>

					<h2 className='mb-2 line-clamp-1 text-xl font-bold text-gray-800 group-hover:text-black'>{board?.title}</h2>
				</div>

				<div className='mt-6 flex items-center justify-between border-t border-gray-50 pt-4'>
					<div className='flex items-center gap-3 text-gray-400'>
						<div className='flex items-center gap-1 text-xs'>
							<Layers size={14} />
							<span>{board?.columns?.length || 0} колонок</span>
						</div>
					</div>

					<div className='flex items-center gap-1 text-[10px] font-medium tracking-wider text-gray-400 uppercase'>
						<Calendar size={12} />
						{parseData(board?.created_at)}
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(BoardCard)
