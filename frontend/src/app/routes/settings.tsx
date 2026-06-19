import { createFileRoute, redirect } from '@tanstack/react-router'
import Settings from '@/pages/settings'
import ScreenLoader from '@/shared/screen-loader'

export const Route = createFileRoute('/settings')({
	loader: () => <ScreenLoader />,
	beforeLoad: async ({ context }) => {
		const user = await context?.service?.me()

		if (!user) {
			throw redirect({
				to: '/',
				replace: true,
			})
		}
	},
	component: Settings,
})
