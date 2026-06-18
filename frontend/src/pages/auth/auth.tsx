import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { useEffect, useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import AuthForm from './auth-form'
import { useAuth } from '@/app/providers/auth-provider'

const AuthPage = () => {
	const [activeTab, setActiveTab] = useState<'login' | 'register'>()
	const { login, register: reg } = useAuth()
	const { reset } = useForm<{
		login: string
		email: string
		password: string
	}>()

	const inputs = [
		{
			label: 'Логін',
			errorMessage: "Логін повинен бути обов'язковим",
			type: 'login',
			placeholder: 'Введіть ваш логін',
		},
		{
			label: 'Email',
			errorMessage: "Email повинен бути обов'язковим",
			type: 'email',
			placeholder: 'Введіть email',
		},
		{
			label: 'Пароль',
			errorMessage: "Пароль повинен бути обов'язковим",
			type: 'password',
			placeholder: 'Введіть пароль',
		},
	]

	const handleLogin: SubmitHandler<FieldValues> = (data) => {
		login({ login: data.login, password: data.password })
		reset()
	}

	const handleRegister: SubmitHandler<FieldValues> = (data) => {
		reg({ login: data.login, email: data.email, password: data.password })
		reset()
	}

	useEffect(() => {
		reset()
	}, [activeTab])

	return (
		<div className='flex h-full w-full items-center justify-center p-4'>
			<div className='auth-window flex w-full max-w-md flex-col rounded-xl bg-white shadow-md'>
				<div className='flex flex-col justify-center p-4 md:p-8'>
					<div className='mb-6'>
						<h2 className='text-3xl font-bold text-slate-800'>Добрый день!</h2>
						<p className='mt-2 text-slate-500'>Введите ваши данные для входа в аккаунт</p>
					</div>

					<Tabs
						defaultValue='login'
						className='w-full'>
						<TabsList className='mb-4 grid w-full grid-cols-2 bg-slate-100 p-1 md:mb-6'>
							<TabsTrigger
								onClick={() => setActiveTab('login')}
								value='login'
								className='rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'>
								Логін
							</TabsTrigger>
							<TabsTrigger
								onClick={() => setActiveTab('register')}
								value='register'
								className='rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'>
								Реєстрація
							</TabsTrigger>
						</TabsList>

						{['login', 'register'].map((tab) => (
							<TabsContent
								key={tab}
								value={tab}
								className='mt-0 outline-none'>
								<AuthForm
									tab={tab}
									inputs={tab === 'login' ? inputs.filter((el) => el.type !== 'email') : inputs}
									handler={tab === 'login' ? handleLogin : handleRegister}
								/>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
