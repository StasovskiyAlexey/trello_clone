import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { LayoutPanelTop } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useModalStore from '@/store/modal.store'
import { useBoardMutations } from '@/entities/board/api/use-boards'
import { useEffect, useState, type FormEvent } from 'react'
import { useCheckAuth } from '@/app/hooks/queries/useAuth'

export default function CreateBoardModal() {
	const [board, setBoard] = useState<{ title: string }>({
		title: '',
	})

	const { modals, switcher } = useModalStore()
	const { data: user } = useCheckAuth()
	const { createBoard } = useBoardMutations()

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		createBoard(board.title)
		switcher('isOpenCreateBoard', false)
	}

	useEffect(() => {
		setBoard((state) => ({ ...state, title: board.title }))
	}, [user])

	return (
		<Dialog
			open={modals.isOpenCreateBoard.isOpen}
			onOpenChange={() => switcher('isOpenCreateBoard', false)}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					onSubmit={handleSubmit}
					className='p-6'>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600'>
								<LayoutPanelTop size={22} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Нова дошка</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Створіть простір для вашого нового проекту
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-4 py-2'>
						<div className='space-y-2'>
							<Label
								htmlFor='create-title'
								className='ml-1 text-xs tracking-widest text-gray-500 uppercase'>
								Назва дошки
							</Label>
							<Input
								value={board.title}
								onChange={(e) => setBoard((state) => ({ ...state, title: e.target.value }))}
								id='create-title'
								autoFocus
								placeholder='Назва дошки'
								className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1'
							/>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenCreateBoard', false)}
							type='reset'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Скасувати
						</Button>
						<Button
							disabled={!board.title.length}
							type='submit'
							className='rounded-xl bg-indigo-600 px-6 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95'>
							Створити
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
