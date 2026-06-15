import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Pencil, Save } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useModalStore from '@/store/modal.store'
import { useColumnMutations } from '@/entities/column/api/use-columns'
import { useEffect, useState, type FormEvent } from 'react'

export default function UpdateColumnModal() {
	const [title, setTitle] = useState('')
	const { switcher, modals } = useModalStore()

	const column = modals.isOpenUpdateColumn.data?.column
	const boardId = Number(modals.isOpenUpdateColumn.data?.boardId)

	const { updateColumn } = useColumnMutations()

	function handleUpdate(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		updateColumn({ data: { title: title, order: 1 }, columnId: column?.id, boardId })
		switcher('isOpenUpdateColumn', false)
	}

	useEffect(() => {
		setTitle(column?.title)
	}, [column])

	return (
		<Dialog
			open={modals.isOpenUpdateColumn.isOpen}
			onOpenChange={() => switcher('isOpenUpdateColumn', false)}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					onSubmit={handleUpdate}
					className='p-6'>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600'>
								<Pencil size={20} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Редагувати колонку</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Змініть назву етапу вашого проекту
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-4 py-2'>
						<div className='space-y-2'>
							<Label
								htmlFor='update-column-title'
								className='ml-1 text-xs tracking-widest text-gray-500 uppercase'>
								Назва колонки
							</Label>
							<Input
								value={title || ''}
								onChange={(e) => setTitle(e.target.value)}
								id='update-column-title'
								autoFocus
								placeholder='Введіть назву...'
								className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1 focus-visible:ring-amber-500'
							/>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenUpdateColumn', false)}
							type='button'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Скасувати
						</Button>
						<Button
							disabled={!title?.length}
							type='submit'
							className='rounded-xl bg-black px-6 text-white shadow-lg transition-all hover:bg-gray-800 active:scale-95'>
							<Save size={18} />
							Зберегти
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
