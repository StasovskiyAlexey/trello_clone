import { createFileRoute, redirect } from '@tanstack/react-router'
import BoardDetail from '@/pages/board/board'
import ScreenLoader from '@/shared/screen-loader'

export const Route = createFileRoute('/boards/$boardId')({
	loader: () => <ScreenLoader />,
	beforeLoad: async ({ context }) => {
		const user = await context.service?.me()
		if (!user) {
			throw redirect({
				to: '/auth',
				replace: true,
			})
		}
	},
	component: BoardDetail,
})
