import ScreenLoader from '@/shared/screen-loader'
import MainLayout from '@/app/layouts/main-layout'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { TUser } from '@/types/user'
import type { TAuthService } from '@/features/auth/api/auth.service'

export interface MyRouterContext {
	user: TUser
	service: TAuthService
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	pendingComponent: () => <ScreenLoader />,
	component: () => (
		<MainLayout>
			<Outlet />
		</MainLayout>
	),
})
