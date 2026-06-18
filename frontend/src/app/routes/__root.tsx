import ScreenLoader from '@/shared/screen-loader'
import MainLayout from '@/app/layouts/main-layout'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { TUser } from '@/entities/user'
import type { AuthService } from '@/features/auth/api/auth.service'

export interface MyRouterContext {
	user: TUser
	service: AuthService | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	pendingComponent: () => <ScreenLoader />,
	component: () => (
		<MainLayout>
			<Outlet />
		</MainLayout>
	),
})
