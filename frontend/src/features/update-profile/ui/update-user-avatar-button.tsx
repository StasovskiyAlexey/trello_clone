import { useAuth } from '@/app/providers/auth-provider'
import { useModal } from '@/app/providers/modal-provider'
import { getImageUrl } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'
import { Plus } from 'lucide-react'

export default function UpdateUserAvatarButton() {
	const { switcher } = useModal()
	const { user } = useAuth()
	return (
		<div
			onClick={() => switcher('isOpenUpdateAvatar', true)}
			className='group relative size-24 cursor-pointer rounded-full ring-offset-2 transition-all duration-200 outline-none select-none hover:ring-2 hover:ring-slate-300'>
			{/* Оверлей при ховере: мягкое размытие (backdrop-blur) и плавное появление */}
			<div className='absolute inset-0 z-10 flex flex-col items-center justify-center rounded-full bg-slate-900/40 opacity-0 backdrop-blur-[1px] transition-all duration-200 group-hover:opacity-100'>
				<Plus className='h-5 w-5 text-white/90 transition-transform duration-200 group-hover:scale-110' />
				<span className='mt-0.5 text-[10px] font-medium tracking-wide text-white/80'>Изменить</span>
			</div>

			{/* Компонент Аватарки */}
			<Avatar className='h-full w-full shadow-sm ring-4 ring-slate-50'>
				<AvatarImage
					src={user?.avatar_url ? getImageUrl(user.avatar_url) : undefined}
					alt={user?.login || 'User avatar'}
					className='object-cover'
				/>
				{/* Инициалы вместо дефолтной иконки из интернета — это выглядит гораздо профессиональнее */}
				<AvatarFallback className='flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 text-xl font-bold tracking-wider text-slate-600 uppercase'>
					{user?.login?.substring(0, 2) || 'U'}
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
