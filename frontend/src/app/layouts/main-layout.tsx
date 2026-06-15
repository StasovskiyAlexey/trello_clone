import { Toaster } from 'sonner'
import { type ReactNode } from 'react'
import { Sidebar } from '@/widgets/sidebar'
import useMobile from '@/app/hooks/use-mobile'
import MobileMenu from '@/widgets/mobile-menu'
import { useCheckAuth } from '@/app/hooks/queries/useAuth'

const MainLayout = ({ children }: { children: ReactNode }) => {
	const { data: user } = useCheckAuth()
	const { width } = useMobile()

	return (
		<>
			<Toaster position='top-center' />
			<div className={`grid h-screen w-full ${user && width > 768 ? 'grid-cols-[300px_1fr]' : 'grid-cols-1'}`}>
				{user && width > 768 && <Sidebar />}
				{user && width < 768 && <MobileMenu />}

				<main className='h-screen w-full overflow-y-auto bg-gray-100 p-4'>{children}</main>
			</div>
		</>
	)
}

export default MainLayout
