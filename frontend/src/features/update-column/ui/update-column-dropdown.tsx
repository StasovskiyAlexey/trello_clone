import { useModal } from '@/app/providers/modal-provider'
import type { TColumn } from '@/entities/column'
import { DropdownMenuItem } from '@/shared/ui'
import { SquarePen } from 'lucide-react'

export default function updateColumnDropdownItem({ column, boardId }: { column: TColumn; boardId: number }) {
	const { switcher } = useModal()
	return (
		<DropdownMenuItem
			className='flex cursor-pointer items-center gap-2 text-sm text-slate-700'
			onSelect={() => switcher('isOpenUpdateColumn', true, { column, boardId })}>
			<SquarePen
				size={14}
				className='text-slate-500'
			/>
			<span>Обновить колонку</span>
		</DropdownMenuItem>
	)
}
