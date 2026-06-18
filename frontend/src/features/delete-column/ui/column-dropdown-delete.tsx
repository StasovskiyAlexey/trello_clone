import { DropdownMenuItem } from '@/shared/ui'
import useDeleteColumn from '../api/use-delete-column'
import { Trash } from 'lucide-react'

export default function ColumnDropdownDeleteItem({ columnId, boardId }: { columnId: number; boardId: number }) {
	const { mutate } = useDeleteColumn()
	return (
		<DropdownMenuItem
			className='flex cursor-pointer items-center gap-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-700'
			onSelect={() => mutate({ columnId, boardId })}>
			<Trash size={14} />
			<span>Удалить колонку</span>
		</DropdownMenuItem>
	)
}
