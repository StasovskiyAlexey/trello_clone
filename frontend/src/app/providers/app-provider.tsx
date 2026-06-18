import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { AuthProvider } from './auth-provider'
import { queryClient } from '@/shared/lib/query-client'
import { ModalProvider } from './modal-provider'
import Modals from '@/widgets/modals'
import { DIProvider } from './di-provider'

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<DIProvider>
				<ModalProvider>
					<AuthProvider>
						<Modals />
						{children}
					</AuthProvider>
				</ModalProvider>
			</DIProvider>
		</QueryClientProvider>
	)
}
