import { Settings, LogOut, LayoutDashboard } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'
import { getImageUrl } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { useAuth } from '@/app/providers/auth-provider'

export const Sidebar = () => {
	const { user, logout } = useAuth()
	const location = useLocation()

	const menuItems = [
		{ icon: Settings, label: 'Настройки', href: '/settings', isActive: location.pathname === `/settings` },
		{
			icon: LayoutDashboard,
			label: 'Ваши доски',
			href: '/boards',
			isActive: location.pathname === `/boards` || location.pathname.startsWith('/boards/'),
		},
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
					{menuItems.map((item) => {
						return (
							<li key={item.label}>
								<Link
									to={item.href}
									activeOptions={{ exact: true }}>
									<Button
										className={`group flex w-full items-center gap-3 rounded-md bg-gray-100 px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-200 ${
											item.isActive ? 'bg-blue-600 text-white shadow-md hover:bg-blue-500' : 'text-slate-600'
										} `}>
										<item.icon className={`h-5 w-5 shrink-0 ${item.isActive ? 'text-white' : 'text-black'} `} />

										<span>{item.label}</span>
									</Button>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>

			{/* User */}
			<div className='flex items-center justify-between border-t p-4'>
				<div className='flex items-center gap-3'>
					<Avatar className='size-8'>
						<AvatarImage src={user?.avatar_url ? getImageUrl(user.avatar_url) : ''} />
						<AvatarFallback>{user?.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>

					<div className='min-w-0 flex-1'>
						<p className='truncate text-sm font-semibold text-slate-900'>{user?.login}</p>

						<p className='truncate text-xs text-slate-500'>
							{user!.email!.length > 10 ? user?.email.slice(0, 15) + '...' : user?.email}
						</p>
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
