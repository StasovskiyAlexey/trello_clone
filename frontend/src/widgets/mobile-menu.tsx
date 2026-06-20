import { Settings, LogOut, ChevronRight, LayoutDashboard, Menu } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'
import { getImageUrl } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer'
import { useAuth } from '@/app/providers/auth-provider'

export default function MobileMenu() {
	const { user, logout } = useAuth()

	const menuItems = [
		{ icon: LayoutDashboard, label: 'Доски', href: '/boards' },
		{ icon: Settings, label: 'Настройки', href: '/settings' },
	]

	return (
		<Drawer direction='left'>
			<DrawerTrigger asChild>
				{/* Кнопка вызова меню — светлая, полупрозрачная, как на панелях Trello */}
				<div className='flex justify-end'>
					<Button
						variant='ghost'
						size='icon'
						className='mb-4 rounded-lg border border-slate-200/50 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md hover:bg-white/90 active:bg-white md:hidden'>
						<Menu className='h-5 w-5' />
					</Button>
				</div>
			</DrawerTrigger>

			{/* Контент меню: светлая Trello-эстетика с легким размытием заднего плана */}
			<DrawerContent className='flex h-full w-full flex-col rounded-none border-r border-slate-200/60 bg-white/95 p-4 text-slate-800 backdrop-blur-lg sm:w-75'>
				<DrawerHeader className='mb-6 border-b border-slate-100 p-0 pb-4'>
					<DrawerTitle className='flex items-center gap-2 px-2'>
						{/* Иконка-логотип в форме доски Trello */}
						<div className='flex h-7 w-7 flex-col gap-1 rounded-lg bg-sky-600 p-1 shadow-sm'>
							<div className='flex flex-1 gap-1'>
								<div className='h-[70%] w-[40%] rounded-[2px] bg-white/60' />
								<div className='h-full w-[60%] rounded-[2px] bg-white' />
							</div>
						</div>
						<span className='text-lg font-bold tracking-wide text-slate-900'>
							Trello <span className='font-light text-slate-500'>Clone</span>
						</span>
					</DrawerTitle>
				</DrawerHeader>

				<nav className='flex-1'>
					<ul className='space-y-1'>
						{menuItems.map((item) => (
							<DrawerClose
								asChild
								key={item.label}>
								<Link
									activeOptions={{ exact: true }}
									to={item.href}>
									{({ isActive }) => (
										<button
											className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-150 outline-none ${
												isActive
													? 'border-l-4 border-sky-600 bg-sky-50 pl-2 font-semibold text-sky-700'
													: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
											}`}>
											<div className='flex items-center gap-3'>
												<item.icon
													className={`h-4.5 w-4.5 transition-transform ${
														isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-900'
													}`}
												/>
												<span className='text-sm'>{item.label}</span>
											</div>

											<ChevronRight
												className={`h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 ${
													isActive ? 'text-sky-600 opacity-100' : 'opacity-0 group-hover:opacity-100'
												}`}
											/>
										</button>
									)}
								</Link>
							</DrawerClose>
						))}
					</ul>
				</nav>

				{/* Профиль пользователя внизу боковой панели */}
				<div className='-mx-4 mt-auto rounded-t-xl border-t border-slate-100 bg-slate-50/50 px-4 pt-4 pb-2'>
					<div className='mb-4 flex items-center gap-3 px-1 pt-2'>
						<Avatar
							className='h-9 w-9 shadow-sm ring-2 ring-slate-200/60'
							size='default'>
							<AvatarImage
								src={user?.avatar_url ? getImageUrl(user.avatar_url) : undefined}
								alt={user?.login || 'Пользователь'}
							/>
							<AvatarFallback className='bg-linear-to-br from-sky-400 to-sky-600 text-sm font-bold text-white uppercase'>
								{user?.login?.substring(0, 2) || 'U'}
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col truncate'>
							<span className='truncate text-sm font-semibold text-slate-900'>{user?.login}</span>
							<span className='mt-0.5 truncate text-xs text-slate-500'>{user?.email}</span>
						</div>
					</div>

					<button
						onClick={() => logout()}
						className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-rose-600 transition-colors hover:bg-rose-50 active:bg-rose-100/70'>
						<LogOut className='h-4 w-4' />
						<span className='text-sm font-medium'>Выйти из аккаунта</span>
					</button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
