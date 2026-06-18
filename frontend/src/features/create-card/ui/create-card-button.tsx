import { useModal } from '@/app/providers/modal-provider'
import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'

export default function AddCardButton({ columnId, boardId }: { columnId: number; boardId: number }) {
	const { switcher } = useModal()
	return (
		<Button
			variant='ghost'
			onClick={() => switcher('isOpenCreateCard', true, { columnId, boardId })}
			className='flex w-full items-center justify-start justify-items-start gap-2 rounded-lg bg-transparent px-3 py-2 text-xs font-medium text-slate-600 shadow-none transition-colors hover:bg-slate-200 hover:text-slate-800'>
			<Plus
				size={14}
				className='text-slate-500'
			/>
			<span>Добавить карточку</span>
		</Button>
	)
}
