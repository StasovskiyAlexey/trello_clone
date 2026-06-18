import { useModal } from '@/app/providers/modal-provider'
import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'

export default function CreateBoardBtn() {
	const { switcher } = useModal()

	return (
		<Button
			onClick={() => switcher('isOpenCreateBoard', true)}
			className='flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm shadow-blue-100 transition-all hover:bg-blue-700'>
			<Plus
				size={16}
				strokeWidth={3}
			/>
			<span className='text-sm font-semibold'>Создать доску</span>
		</Button>
	)
}
