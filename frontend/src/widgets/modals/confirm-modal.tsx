import { useModal } from '@/app/providers/modal-provider'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'

export default function ConfirmModal() {
	const { modals, switcher } = useModal()

	const action = modals.isOpenConfirmModal.props?.action

	// Для сброса данных или еще чего-то
	const event = modals.isOpenConfirmModal.props?.event

	const handleConfirm = () => {
		if (action) {
			action()
		}

		if (event) {
			event()
		}

		switcher('isOpenConfirmModal', false)
	}

	return (
		<AlertDialog open={modals.isOpenConfirmModal.isOpen}>
			<AlertDialogContent className='max-w-100 rounded-xl border border-slate-100 bg-white p-6 shadow-xl'>
				<AlertDialogHeader className='space-y-2.5 text-left'>
					<AlertDialogTitle className='text-base font-semibold text-slate-900'>
						Вы уверены в ваших действиях?
					</AlertDialogTitle>
					<p className='text-xs leading-relaxed text-slate-500'>
						Это действие нельзя будет отменить. Пожалуйста, подтвердите, что вы действительно хотите продолжить.
					</p>
				</AlertDialogHeader>

				<AlertDialogFooter className='mt-6 flex flex-row items-center justify-end gap-2.5'>
					{/* Кнопка Отмена — спокойная, серая, сливается с фоном */}
					<AlertDialogCancel
						onClick={() => switcher('isOpenConfirmModal', false)}
						asChild>
						<Button
							variant='default'
							className='h-9 rounded-lg border px-4 text-sm font-medium text-slate-500 shadow-none'>
							Отмена
						</Button>
					</AlertDialogCancel>

					{/* Кнопка Принять — если это удаление, делаем приглушенный красный, а не ядовитый */}
					<AlertDialogAction
						onClick={() => handleConfirm()}
						asChild>
						<Button className='h-9 rounded-lg border-none bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800'>
							Принять
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
