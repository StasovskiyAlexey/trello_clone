import { Columns3, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { Label } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { useState, type FormEvent } from 'react'
import { useModal } from '@/app/providers/modal-provider'
import useCreateColumn from '../../api/use-create-column'

export default function CreateColumnModal() {
	const [column, setColumn] = useState({
		title: '',
	})

	const { modals, switcher } = useModal()
	const { mutate } = useCreateColumn()

	const boardId = modals.isOpenCreateColumn.props?.boardId

	function handleCreateColumn(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		mutate({ data: { title: column.title }, boardId })
		switcher('isOpenCreateColumn', false)
	}

	return (
		<Dialog
			open={modals.isOpenCreateColumn.isOpen}
			onOpenChange={() => switcher('isOpenCreateColumn', false)}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					onSubmit={handleCreateColumn}
					className='p-6'>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600'>
								<Columns3 size={22} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Новая колонка</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Добавьте новый этап в ваш рабочий процесс
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-4 py-2'>
						<div className='space-y-4'>
							<div className='flex flex-col gap-2'>
								<Label
									htmlFor='column-title'
									className='ml-1 text-xs tracking-widest text-gray-500 uppercase'>
									Название колонки
								</Label>
								<Input
									id='column-title'
									autoFocus
									onChange={(e) => setColumn((state) => ({ ...state, title: e.target.value }))}
									placeholder='Например, в процессе... готово...'
									className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1 focus-visible:ring-emerald-500'
								/>
							</div>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenCreateColumn', false)}
							type='reset'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Отменить
						</Button>
						<Button
							type='submit'
							disabled={!column.title.length}
							className='rounded-xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95'>
							<Plus size={18} />
							Добавить
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
