import { useModal } from '@/app/providers/modal-provider'
import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'

export default function CreateColumnBtn({ boardId }: { boardId: number }) {
	const { switcher } = useModal()

	return (
		<Button
			onClick={() => switcher('isOpenCreateColumn', true, { boardId })}
			className='bg-indigo-600 hover:bg-indigo-700'>
			<Plus
				size={18}
				strokeWidth={2.5}
			/>
			<span className='text-sm font-semibold'>Добавить колонку</span>
		</Button>
	)
}
