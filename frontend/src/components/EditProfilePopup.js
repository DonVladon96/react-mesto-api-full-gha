import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormValidation from "../utils/validations";

function EditProfilePopup({ isOpen , isClosed, onUpdateUser}) {
	const currentUser = useContext(CurrentUserContext);

	const {values, errors, onChange, restartForm } = useFormValidation();

	useEffect(() => {
		if (currentUser) {
			restartForm(currentUser);
		}
	}, [currentUser, isOpen, isClosed]);


	function handleSubmitChange(evt) {
		evt.preventDefault();

		onUpdateUser(values);
	}

	return (
		<PopupWithForm
			name='user'
			title='Редактировать профиль'
			buttonText='Сохранить'
			isOpen={isOpen}
			isClosed={isClosed}
			onSubmit={handleSubmitChange}
		>
			<input
				type='text'
				id='input-name'
				name='dataName'
				className='popup__input'
				placeholder='Как вас зовут?'
				minLength={2}
				maxLength={40}
				required=''
				onChange={onChange}
				value={values.name || ''}
			/>
			<span className='input-name-error popup__input-error'>
				{errors.name || ''}
			</span>
			<input
				type='text'
				name='dataJob'
				placeholder='Чем вы занимаетесь?'
				className='popup__input'
				id='input-job'
				minLength={2}
				maxLength={200}
				required=''
				onChange={onChange}
				value={values.about || ''}
			/>
			<span className='input-job-error popup__input-error'>
				{errors.name || ''}
			</span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
