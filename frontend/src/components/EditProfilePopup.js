import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState(currentUser.name);
	const [description, setDescription] = useState(currentUser.about);

	useEffect(() => {
		return () => {
			setName(currentUser.name);
			setDescription(currentUser.about);
		};
	}, [currentUser, props.isOpen, props.isClosed]);

	function handleEditName(evt) {
		setName(evt.target.value);
	}

	function handleSubmitChange(evt) {
		evt.preventDefault();

		props.onUpdateUser({ name, about: description });
	}

	function handleEditDescription(evt) {
		setDescription(evt.target.value);
	}

	return (
		<PopupWithForm
			name='user'
			title='Редактировать профиль'
			buttonText='Сохранить'
			isOpen={props.isOpen}
			isClosed={props.isClosed}
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
				onChange={handleEditName}
				value={name || ''}
			/>
			<span className='input-name-error popup__input-error'>
				вы пропустили поле.
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
				onChange={handleEditDescription}
				value={description || ''}
			/>
			<span className='input-job-error popup__input-error'>
				вы пропустили поле.
			</span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
