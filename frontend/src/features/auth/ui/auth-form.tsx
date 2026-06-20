import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useEffect, useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'

function AuthForm({
	tab,
	handler,
	inputs,
}: {
	tab: string
	handler: SubmitHandler<FieldValues>
	inputs: {
		label: string
		errorMessage: string
		type: string
		placeholder: string
	}[]
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm()

	const [isDisabled, setIsDisabled] = useState<boolean>(true)

	const values = watch()

	useEffect(() => {
		if (tab === 'login') {
			setIsDisabled(!values.login || !values.password ? true : false)
		} else if (tab === 'register') {
			setIsDisabled(!values.login || !values.password || !values.email ? true : false)
		}
	}, [values])

	return (
		<form
			className='space-y-5'
			onSubmit={handleSubmit(handler)}>
			{inputs.map((input) => (
				<div
					key={input.type}
					className='space-y-1.5'>
					<label className='ml-1 text-sm font-medium text-slate-700'>{input.label}</label>
					<div className='relative'>
						<Input
							{...register(input.type, {
								required: input.errorMessage,
							})}
							className='h-11 rounded-lg border-slate-200 pl-4 text-black transition-all focus:border-purple-500 focus:ring-purple-500'
							type={input.type === 'password' ? 'password' : 'text'}
							placeholder={input.placeholder}
						/>
					</div>
					{errors[input.type] && <p className='mt-1 ml-1 animate-pulse text-xs text-red-500'>{input.errorMessage}</p>}
				</div>
			))}
			<Button
				disabled={isDisabled}
				type='submit'
				className='h-11 w-full rounded-lg font-semibold shadow-lg transition-all'>
				{tab === 'login' ? 'Войти в аккаунт' : 'Создать аккаунт'}
			</Button>
		</form>
	)
}

export default AuthForm
