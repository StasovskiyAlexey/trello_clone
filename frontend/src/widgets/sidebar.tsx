import { Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'
import { getImageUrl } from '@/shared/lib/utils'
import { useAuthMutations, useCheckAuth } from '@/app/hooks/queries/useAuth'
import { Button } from '@/shared/ui/button'

export const Sidebar = () => {
	const { logout } = useAuthMutations()
	const { data: user } = useCheckAuth()

	const menuItems = [
		{ icon: Settings, label: 'Настройки', href: '/' },
		{ icon: LayoutDashboard, label: 'Ваши доски', href: '/boards' },
	]

	return (
		<aside className='flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-50'>
			{/* Logo */}
			<div className='border-b border-slate-200 p-5'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md'>
						TC
					</div>

					<div>
						<h1 className='text-lg font-bold text-slate-900'>Trello Clone</h1>
						<p className='text-xs text-slate-500'>Project Management</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className='mt-4 flex-1 px-4'>
				<ul className='space-y-1'>
					{menuItems.map((item) => (
						<li key={item.label}>
							<Link
								to={item.href}
								activeOptions={{ exact: true }}>
								{({ isActive }) => (
									<button
										className={`group flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ${
											isActive
												? 'bg-blue-600 text-white shadow-md'
												: 'text-slate-600 hover:bg-white hover:text-slate-900'
										} `}>
										<item.icon
											className={`h-5 w-5 shrink-0 ${
												isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
											} `}
										/>

										<span>{item.label}</span>
									</button>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* User */}
			<div className='flex items-center justify-between border-t p-4'>
				<div className='flex items-center gap-3'>
					<Avatar className='h-11 w-11'>
						<AvatarImage
							src={
								user?.avatar_url
									? getImageUrl(user.avatar_url)
									: 'https://img.icons8.com/ios-filled/100/user-male-circle.png'
							}
						/>
						<AvatarFallback>{user?.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>

					<div className='min-w-0 flex-1'>
						<p className='truncate text-sm font-semibold text-slate-900'>{user?.login}</p>

						<p className='truncate text-xs text-slate-500'>{user?.email}</p>
					</div>
				</div>

				<Button
					onClick={() => logout()}
					variant='secondary'>
					<LogOut size={0} />
				</Button>
			</div>
		</aside>
	)
}
