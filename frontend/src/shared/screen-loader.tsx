import { Spinner } from './ui'

export default function ScreenLoader({ message }: { message?: string }) {
	return (
		<div className='fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/50'>
			<Spinner className='size-6' />
			<p className='animate-pulse font-medium text-white'>{message}</p>
		</div>
	)
}
