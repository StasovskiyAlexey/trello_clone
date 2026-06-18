import { AuthService } from '@/features/auth/api/auth.service'
import type { TUser, TUserLogin, TUserRegister } from '@/entities/user/model/types'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { useInjection } from './di-provider'
import { TTYPES } from '@/shared/di/types'

export type TAuthContext = {
	login: ({ login, password }: TUserLogin) => void
	me: () => Promise<TUser | undefined>
	register: ({ login, email, password }: TUserRegister) => void
	logout: () => void
	isLoading: boolean
	user: TUser | null
	setUser: React.Dispatch<React.SetStateAction<TUser | null>>
}

const AuthContext = createContext<TAuthContext | null>(null)

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
	const [user, setUser] = useState<TUser | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const router = useRouter()

	const authService = useInjection<AuthService>(TTYPES.AuthService)

	async function login({ login, password }: TUserLogin) {
		setIsLoading(true)
		try {
			const res = await authService.login({ login, password })

			setUser(res.data)
			await router.invalidate()

			toast.success(res.message)

			navigate({ to: '/', replace: true })
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e.response?.data.detail)
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function me() {
		setIsLoading(true)
		try {
			const res = await authService.me()
			if (res?.data) {
				setUser(res.data)
			}
			return res?.data
		} catch (e) {
			setUser(null)
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}

	async function register({ login, email, password }: TUserRegister) {
		setIsLoading(true)
		try {
			const res = await authService.register({ login, email, password })
			setUser(res.data)

			await router.invalidate()

			toast.success('Аккаунт успішно зареєстровано')
			navigate({ to: '/', replace: true })
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e.response?.data.detail)
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function logout() {
		setIsLoading(true)
		try {
			const res = await authService.logout()

			setUser(null)
			await router.invalidate()

			toast.success('Успішний вихід з аккаунту')
			navigate({ to: '/auth' })
			return res
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e.response?.data.detail)
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		me()
	}, [])

	return (
		<AuthContext.Provider value={{ login, me, register, logout, isLoading, user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('Error')
	}

	return context
}
