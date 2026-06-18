import { Toaster } from 'sonner'
import { type ReactNode } from 'react'
import { Sidebar } from '@/widgets/sidebar'
import useMobile from '@/app/hooks/use-mobile'
import MobileMenu from '@/widgets/mobile-menu'
import { useAuth } from '../providers/auth-provider'

const MainLayout = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth()
	const { width } = useMobile()

	const isMobile = width > 768

	return (
		<>
			<Toaster position='top-center' />
			<div className={`flex h-screen w-full overflow-hidden`}>
				{user && isMobile && <Sidebar />}
				{user && isMobile && <MobileMenu />}

				<main className='relative h-screen min-w-0 flex-1 overflow-y-auto bg-gray-100 p-4'>{children}</main>
			</div>
		</>
	)
}

export default MainLayout
