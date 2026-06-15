import { createContext, type ReactNode, useContext, useState } from 'react'

const modalsMap = {
  isOpenUpdateBoard: {isOpen: false, props: null},
  isOpenUpdateAvatar: {isOpen: false, props: null},
  isOpenCreateBoard: {isOpen: false, props: null},
  isOpenConfirmModal: {isOpen: false, props: null},
  isOpenCreateColumn: {isOpen: false, props: null},
  isOpenUpdateColumn: {isOpen: false, props: null},
  isOpenCreateCard: {isOpen: false, props: null},
  isOpenUpdateCard: {isOpen: false, props: null},
}

type TModalsNames = keyof typeof modalsMap

export type TModalContext = {
	switcher: (modal: TModalsNames, isOpen: boolean, props?: unknown) => void
	modals: typeof modalsMap
}

const ModalContext = createContext<TModalContext | null>(null)

export const ModalProvider = ({ children }: { children?: ReactNode }) => {
	const [modals, setModals] = useState<typeof modalsMap>(modalsMap)

	function switcher(modal: string, isOpen: boolean, props?: unknown) {
		setModals((prev) => ({ ...prev, [modal]: { isOpen, props } }))
	}

	return <ModalContext.Provider value={{ switcher, modals }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
	const context = useContext(ModalContext)

	if (!context) {
		throw new Error('Error')
	}

	return context
}