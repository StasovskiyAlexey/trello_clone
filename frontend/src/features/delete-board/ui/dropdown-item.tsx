import type { TBoard } from '@/entities/board'
import { DropdownMenuItem } from '@/shared/ui'
import useDeleteBoard from '../api/use-delete-board'
import { Trash } from 'lucide-react'

export default function DropdownDeleteBoardItem({ board }: { board: TBoard }) {
	const { mutate } = useDeleteBoard()

	return (
		<DropdownMenuItem
			className='flex cursor-pointer items-center gap-2 text-xs text-red-600 focus:bg-red-50 focus:text-red-700'
			onSelect={() => mutate(board?.id as number)}>
			<Trash size={14} />
			<span>Удалить доску</span>
		</DropdownMenuItem>
	)
}
