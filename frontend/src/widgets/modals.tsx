import { useModal } from '@/app/providers/modal-provider'
import { lazy } from 'react'

const isOpenCreateBoard = lazy(() => import('@/features/create-board').then((m) => ({ default: m.CreateBoardModal })))
const isOpenUpdateBoard = lazy(() => import('@/features/update-board').then((m) => ({ default: m.UpdateBoardModal })))
const isOpenCreateColumn = lazy(() =>
	import('@/features/create-column').then((m) => ({ default: m.CreateColumnModal })),
)
const isOpenUpdateColumn = lazy(() =>
	import('@/features/update-column').then((m) => ({ default: m.UpdateColumnModal })),
)
const isOpenCreateCard = lazy(() => import('@/features/create-card').then((m) => ({ default: m.CreateCardModal })))
const isOpenUpdateCard = lazy(() => import('@/features/update-card').then((m) => ({ default: m.UpdateCardModal })))

const modalsMap: Record<string, React.ComponentType> = {
	isOpenCreateBoard,
	isOpenUpdateBoard,
	isOpenCreateColumn,
	isOpenUpdateColumn,
	isOpenCreateCard,
	isOpenUpdateCard,
}

export default function Modals() {
	const { modals } = useModal()

	return (
		<>
			{Object.entries(modals).map(([name, state]) => {
				const ModalComponent = modalsMap[name]
				if (!ModalComponent) return null

				return (
					<ModalComponent
						key={name}
						{...(state.props as any)}
					/>
				)
			})}
		</>
	)
}
