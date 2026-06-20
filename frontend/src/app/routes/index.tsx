import ScreenLoader from '@/shared/screen-loader'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	loader: () => <ScreenLoader />,

	beforeLoad: async ({ context }) => {
		const user = await context.service?.me()

		if (!user) {
			throw redirect({
				to: '/auth',
				replace: true,
			})
		}

		throw redirect({
			to: '/boards',
			replace: true,
		})
	},
})
