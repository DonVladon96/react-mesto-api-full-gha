import {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import useFormValidation from "../utils/validations";

function EditAvatarPopup({onSubmit, isOpen, isClosed}) {
	const currentUser = useContext(CurrentUserContext);

	const { values, errors, onChange, restartForm } = useFormValidation();

	useEffect(() => {
		restartForm();
	}, [isOpen]);

	function useSubmit(evt) {
		evt.preventDefault();

		onSubmit(values);
	}

	return (
		<PopupWithForm
			name='avatar'
			title='Обновить аватар'
			buttonText='Сохранить'
			isOpen={isOpen}
			isClosed={isClosed}
			onSubmit={useSubmit}
		>
			<input
				type='url'
				name='avatar'
				placeholder='Ссылка на картинку'
				className='popup__input popup__input_avatar-link'
				id='avatar-link'
				required=''
				onChange={onChange}
				value={values.avatar || ''}
			/>
			<span className='avatar-link-error popup__input-error'>
				{errors.avatar || ''}
			</span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
