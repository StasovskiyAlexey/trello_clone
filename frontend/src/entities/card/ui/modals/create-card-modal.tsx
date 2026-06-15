import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { AlignLeft, Plus, SquareStack } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useEffect, useState, type FormEvent } from 'react'
import useModalStore from '@/store/modal.store'
import { useCardMutations } from '@/entities/card/api/use-cards'

export default function CreateCardModal() {
	const [card, setCard] = useState<{ title: string; description: string }>({
		title: '',
		description: '',
	})

	const { switcher, modals } = useModalStore()
	const { createCard } = useCardMutations()

	const columnId = modals.isOpenCreateCard.data?.columnId
	const boardId = modals.isOpenCreateCard.data?.boardId

	function handleCreateCard(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		createCard({ boardId, data: { title: card.title, description: card.description }, columnId })
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
								<DialogTitle className='text-xl font-bold tracking-tight'>Нове завдання</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Опишіть завдання, яке потрібно виконати
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
								Назва завдання
							</Label>
							<Input
								value={card.title}
								onChange={(e) => setCard((state) => ({ ...state, title: e.target.value }))}
								id='card-title'
								autoFocus
								placeholder='Що потрібно зробити?'
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
									Опис
								</Label>
							</div>
							<Textarea
								value={card.description}
								onChange={(e) => setCard((state) => ({ ...state, description: e.target.value }))}
								id='card-desc'
								placeholder="Додайте деталі (необов'язково)..."
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
							Скасувати
						</Button>
						<Button
							disabled={!card.title.length}
							type='submit'
							className='rounded-xl bg-blue-600 px-6 text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95'>
							<Plus size={18} />
							Створити картку
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
