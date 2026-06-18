import { createFileRoute, redirect } from '@tanstack/react-router'
import Boards from '@/pages/board/boards'
import ScreenLoader from '@/shared/screen-loader'

export const Route = createFileRoute('/boards/')({
	loader: () => <ScreenLoader />,
	beforeLoad: async ({ context }) => {
		const user = await context.service.me()

		if (!user) {
			throw redirect({
				to: '/auth',
				replace: true,
			})
		}
	},
	component: Boards,
})
