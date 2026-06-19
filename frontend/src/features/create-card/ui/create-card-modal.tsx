import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { AlignLeft, Plus, SquareStack } from 'lucide-react'
import { Label } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { useEffect, useState, type FormEvent } from 'react'
import { useModal } from '@/app/providers/modal-provider'
import useCreateCard from '../api/use-create-card'

export default function CreateCardModal() {
	const [card, setCard] = useState<{ title: string; description: string }>({
		title: '',
		description: '',
	})

	const { switcher, modals } = useModal()
	const { mutate } = useCreateCard()

	const columnId = modals.isOpenCreateCard.props?.columnId
	const boardId = modals.isOpenCreateCard.props?.boardId

	function handleCreateCard(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		mutate({ boardId, data: { title: card.title, description: card.description }, columnId })
		switcher('isOpenCreateCard', false)
	}

	useEffect(() => {
		if (!modals.isOpenCreateCard.isOpen) {
			setCard({ title: '', description: '' })
		}
	}, [modals.isOpenCreateCard.isOpen])

	return (
		<Dialog
			onOpenChange={() => switcher('isOpenCreateCard', false)}
			open={modals.isOpenCreateCard.isOpen}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					onSubmit={handleCreateCard}
					className='p-6'>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							{/* Синій/Фіолетовий колір для карток */}
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600'>
								<SquareStack size={22} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Новая карточка</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Опишите карточку, которую хотите создать
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-5 py-2'>
						{/* Назва картки */}
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor='card-title'
								className='ml-1 text-xs font-semibold tracking-widest text-gray-500 uppercase'>
								Название задания
							</Label>
							<Input
								value={card.title}
								onChange={(e) => setCard((state) => ({ ...state, title: e.target.value }))}
								id='card-title'
								autoFocus
								placeholder='Что нужно сделать?'
								className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1 focus-visible:ring-blue-500'
							/>
						</div>

						{/* Опис картки */}
						<div className='flex flex-col gap-2'>
							<div className='ml-1 flex items-center gap-2'>
								<AlignLeft
									size={14}
									className='text-gray-400'
								/>
								<Label
									htmlFor='card-desc'
									className='text-xs font-semibold tracking-widest text-gray-500 uppercase'>
									Описание
								</Label>
							</div>
							<Textarea
								value={card.description}
								onChange={(e) => setCard((state) => ({ ...state, description: e.target.value }))}
								id='card-desc'
								placeholder='Добавьте детали (необязательно)...'
								className='min-h-25 resize-none rounded-xl border-gray-200 p-4 transition-all focus-visible:ring-1 focus-visible:ring-blue-500'
							/>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenCreateCard', false)}
							type='reset'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Отменить
						</Button>
						<Button
							disabled={!card.title.length}
							type='submit'
							className='rounded-xl bg-blue-600 px-6 text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95'>
							<Plus size={18} />
							Создать карточку
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
