import { useEffect, useState, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { AlignLeft, Save, SquarePen } from 'lucide-react'
import { Label } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { useModal } from '@/app/providers/modal-provider'
import useUpdateCard from '../../api/use-update-card'

export default function UpdateCardModal() {
	const [card, setCard] = useState({
		title: '',
		description: '',
	})

	const { switcher, modals } = useModal()

	const boardId: number = modals.isOpenUpdateCard.props?.boardId
	const cardData = modals.isOpenUpdateCard.props?.card
	const columnId = modals.isOpenUpdateCard.props?.columnId

	const { mutate } = useUpdateCard({ boardId })

	function handleUpdateCard(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		mutate({ columnId, cardId: cardData?.id, data: { title: card.title, description: card.description, order: 1 } })
		switcher('isOpenUpdateCard', false)
	}

	useEffect(() => {
		setCard((state) => ({ ...state, title: cardData?.title, description: cardData?.description }))
	}, [cardData])

	return (
		<Dialog
			onOpenChange={() => switcher('isOpenUpdateCard', false)}
			open={modals.isOpenUpdateCard.isOpen}>
			<DialogContent className='overflow-hidden border-none p-0 shadow-2xl sm:max-w-150'>
				<form
					onSubmit={handleUpdateCard}
					className='p-6'>
					<DialogHeader className='mb-6'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600'>
								<SquarePen size={22} />
							</div>
							<div>
								<DialogTitle className='text-xl font-bold tracking-tight'>Редактировать задачу</DialogTitle>
								<DialogDescription className='text-muted-foreground text-sm'>
									Обновите детали вашего задания
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className='space-y-5 py-2'>
						{/* Назва картки */}
						<div className='flex flex-col gap-2'>
							<Label
								htmlFor='update-card-title'
								className='ml-1 text-xs font-semibold tracking-widest text-gray-500 uppercase'>
								Название задания
							</Label>
							<Input
								value={card.title || ''}
								onChange={(e) => setCard((prev) => ({ ...prev, title: e.target.value }))}
								id='update-card-title'
								autoFocus
								placeholder='Что нужно сделать?'
								className='h-12 rounded-xl border-gray-200 px-4 text-base transition-all focus-visible:ring-1 focus-visible:ring-violet-500'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<div className='ml-1 flex items-center gap-2'>
								<AlignLeft
									size={14}
									className='text-gray-400'
								/>
								<Label
									htmlFor='update-card-desc'
									className='text-xs font-semibold tracking-widest text-gray-500 uppercase'>
									Описание
								</Label>
							</div>
							<Textarea
								value={card.description || ''}
								onChange={(e) => setCard((prev) => ({ ...prev, description: e.target.value }))}
								id='update-card-desc'
								placeholder='Добавьте детали...'
								className='max-h-120 min-h-25 resize-none overflow-auto rounded-xl border-gray-200 p-4 transition-all focus-visible:ring-1 focus-visible:ring-violet-500'
							/>
						</div>
					</div>

					<DialogFooter className='mt-8 flex gap-2'>
						<Button
							onClick={() => switcher('isOpenUpdateCard', false)}
							type='button'
							variant='ghost'
							className='rounded-xl font-semibold hover:bg-gray-100'>
							Отменить
						</Button>
						<Button
							disabled={!card.title?.length}
							type='submit'
							className='rounded-xl bg-violet-600 px-6 text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 active:scale-95'>
							<Save size={18} />
							Сохранить изменения
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
