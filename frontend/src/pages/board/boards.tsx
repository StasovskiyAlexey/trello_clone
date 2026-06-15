import BoardCard from '@/entities/board/ui/board-card'
import ScreenLoader from '@/shared/screen-loader'
import { Button } from '@/shared/ui/button'
import { useBoardsList } from '@/entities/board/api/use-boards'
import useModalStore from '@/store/modal.store'
import { Plus } from 'lucide-react'
import { lazy, Suspense } from 'react'

// const UpdateBoardModal = lazy(() => import('@/components/modals/UpdateBoardModal'))
// const CreateBoardModal = lazy(() => import('@/components/modals/CreateBoardModal'))

export default function Boards() {
	const { data, isLoading } = useBoardsList()
	const switcher = useModalStore((state) => state.switcher)

	if (isLoading) {
		return <ScreenLoader />
	}

	return (
		<>
			<div className='mx-auto w-full px-4 font-sans'>
				{/* Шапка рабочей области в стиле Trello */}
				<header className='sticky top-0 z-10 mb-6 flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-lg'>
					<div className='flex items-center gap-3'>
						{/* Иконка досок перед заголовком */}
						<div className='rounded-xl bg-blue-50 p-2 text-blue-600'>
							<svg
								className='h-5 w-5 fill-current'
								viewBox='0 0 24 24'>
								<path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.5 13c0 .83-.67 1.5-1.5 1.5h-2c-.83 0-1.5-.67-1.5-1.5V7c0-.83 0.67-1.5 1.5-1.5h2c.83 0 1.5 0.67 1.5 1.5v9zm8-4c0 .83-.67 1.5-1.5 1.5h-2c-.83 0-1.5-.67-1.5-1.5V7c0-.83 0.67-1.5 1.5-1.5h2c.83 0 1.5 1.5 1.5 1.5v5z' />
							</svg>
						</div>
						<div className='flex flex-col'>
							<h1 className='text-xl font-extrabold tracking-tight text-slate-800'>Мои доски</h1>
							<p className='hidden text-xs text-slate-400 sm:block'>Персональное рабочее пространство</p>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Button
							onClick={() => switcher('isOpenCreateBoard', true)}
							className='flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm shadow-blue-100 transition-all hover:bg-blue-700'>
							<Plus
								size={16}
								strokeWidth={3}
							/>
							<span className='text-sm font-semibold'>Создать доску</span>
						</Button>
					</div>
				</header>

				{/* Сетка досок (Четкая структура вместо flex-wrap) */}
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{/* Красивое пустое состояние (Empty State) */}
					{!data?.length && (
						<div className='col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center'>
							<div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
								<svg
									className='h-6 w-6 fill-none stroke-current'
									viewBox='0 0 24 24'
									strokeWidth='2'>
									<rect
										x='3'
										y='3'
										width='18'
										height='18'
										rx='2'
									/>
									<path d='M9 3v18M15 3v18' />
								</svg>
							</div>
							<h3 className='text-sm font-semibold text-slate-700'>Нет активных досок</h3>
							<p className='mt-1 max-w-[240px] text-xs text-slate-400'>
								Создайте свою первую доску, чтобы начать структурировать задачи и проекты.
							</p>
						</div>
					)}

					{/* Вывод карточек */}
					{data &&
						data.map((board) => (
							<BoardCard
								key={board?.id}
								board={board}
							/>
						))}
				</div>
			</div>

			{/* <Suspense fallback={<ScreenLoader/>}>
        <UpdateBoardModal/>
        <CreateBoardModal/>
      </Suspense> */}
		</>
	)
}
