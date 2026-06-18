import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import ScreenLoader from './shared/screen-loader'
import { useAuth } from './app/providers/auth-provider'
import { useInjection } from './app/providers/di-provider'
import { TTYPES } from './shared/di/types'
import { AuthService } from './features/auth/api/auth.service'

const router = createRouter({
	routeTree,
	context: {
		user: null,
		service: undefined,
	},
})

function App() {
	const { user, isLoading } = useAuth()
	const authService = useInjection<AuthService>(TTYPES.AuthService)

	if (isLoading) {
		return <ScreenLoader />
	}

	return (
		<RouterProvider
			router={router}
			context={{ user, service: authService }}
		/>
	)
}

export default App
