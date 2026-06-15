import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Layout, Save } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState, type FormEvent } from 'react'
import { useBoardMutations } from '@/entities/board/api/use-boards'
import useModalStore from '@/store/modal.store'

export default function UpdateBoardModal() {
	const [boardData, setBoardData] = useState<{ title: string; boardId?: number }>({
		title: '',
		boardId: 0,
	})

	const { updateBoard } = useBoardMutations()
	const { modals, switcher } = useModalStore()

	const board = modals.isOpenUpdateBoard.data?.board
	const isOpen = modals.isOpenUpdateBoard.isOpen

	function handleUpdateBoard(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (boardData.boardId && boardData.title.trim()) {
			updateBoard({ boardId: boardData?.boardId, title: boardData.title.trim() })
		}
		switcher('isOpenUpdateBoard', false)
	}

	useEffect(() => {
		if (board && isOpen) {
			setBoardData({ title: board.title, boardId: board.id })
		}
	}, [board, isOpen])

	return (
		<Dialog
			onOpenChange={() => switcher('isOpenUpdateBoard', false)}
			open={modals.isOpenUpdateBoard.isOpen}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					className='p-6'
					onSubmit={handleUpdateBoard}>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-black'>
								<Layout size={22} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Редагувати дошку</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Внесіть зміни в назву вашого робочого простору
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-4 py-2'>
						<div className='space-y-2'>
							<Label
								htmlFor='title'
								className='ml-1 text-xs tracking-widest text-gray-500 uppercase'>
								Назва дошки
							</Label>
							<Input
								id='title'
								value={boardData.title}
								onChange={(e) => setBoardData((state) => ({ ...state, title: e.target.value }))}
								placeholder='Введіть нову назву...'
								className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1'
							/>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenUpdateBoard', false)}
							type='reset'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Скасувати
						</Button>
						<Button
							disabled={boardData.title?.length === 0}
							type='submit'
							className='rounded-xl bg-black px-6 text-white shadow-lg transition-all hover:bg-gray-800 active:scale-95'>
							<Save
								size={18}
								className='mr-2'
							/>
							Оновити
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
