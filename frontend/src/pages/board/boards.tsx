import { BoardCard } from '@/entities/board'
import { useBoardsList } from '@/entities/board'
import { CreateBoardBtn } from '@/features/create-board'
import { Spinner } from '@/shared/ui'

export default function Boards() {
	const { data, isLoading } = useBoardsList()

	return (
		<>
			<div className='mx-auto w-full'>
				{/* Шапка рабочей области в стиле Trello */}
				<header className='flex shrink-0 items-center justify-between rounded-xl border-b border-white/10 bg-white/10 px-6 py-4 shadow-sm backdrop-blur-md'>
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
						<CreateBoardBtn />
					</div>
				</header>

				{/* Сетка досок (Четкая структура вместо flex-wrap) */}
				<div className='mt-6'>
					{/* Красивое пустое состояние (Empty State) */}
					{!isLoading && !data?.length && (
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
							<p className='mt-1 max-w-60 text-xs text-slate-400'>
								Создайте свою первую доску, чтобы начать структурировать задачи и проекты.
							</p>
						</div>
					)}

					{/* Вывод карточек */}
					{isLoading ? (
						<div className='mt-6 flex flex-wrap items-center justify-center gap-4'>
							<Spinner />
						</div>
					) : (
						<div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4'>
							{data &&
								data?.map((board) => (
									<BoardCard
										key={board?.id}
										board={board}
									/>
								))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}
