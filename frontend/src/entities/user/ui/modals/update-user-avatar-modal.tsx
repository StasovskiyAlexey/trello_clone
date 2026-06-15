import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import { Label } from '../ui/label'
import useModalStore from '@/store/modal.store'
import { useUsers } from '@/entities/user/api/use-users'

export default function UpdateUserAvatarModal() {
	const [file, setFile] = useState<File | null | undefined>(null)
	const [preview, setPreview] = useState<string | null>(null)

	const { updateUserAvatar } = useUsers()
	const { switcher, modals } = useModalStore()

	const updateAvatar = async () => {
		await updateUserAvatar({ avatarUrl: file })
		switcher('isOpenUpdateAvatar', false)
	}

	// Функция обработки выбора файла
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
			// Создаем временную ссылку для превью
			setPreview(URL.createObjectURL(selectedFile))
		}
	}

	return (
		<Dialog
			onOpenChange={() => switcher('isOpenUpdateAvatar', false)}
			open={modals.isOpenUpdateAvatar.isOpen}>
			<DialogContent className='w-full sm:max-w-150'>
				<DialogHeader>
					<DialogTitle>Обновить аватар</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col items-center justify-center gap-4 py-4'>
					{/* Круг превью */}
					<div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-50'>
						{preview ? (
							<img
								src={preview}
								alt='Preview'
								className='h-full w-full object-cover'
							/>
						) : (
							<Upload className='h-8 w-8 text-gray-400' />
						)}
					</div>
				</div>

				<div className='w-max'>
					<Label
						htmlFor='upload-image'
						className='cursor-pointer rounded-md bg-blue-600 p-3 text-white'>
						Загрузить изображение
					</Label>
					<Input
						id='upload-image'
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='hidden cursor-pointer'
					/>
				</div>

				<DialogFooter>
					<Button
						type='submit'
						onClick={() => updateAvatar()}
						disabled={file === null}>
						Зберегти зміни
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
