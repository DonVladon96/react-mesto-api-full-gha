import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const currentUser = useContext(CurrentUserContext);

	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		setAvatar('');
	}, [props.isOpen]);

	function useSubmit(evt) {
		evt.preventDefault();

		props.onSubmit({ avatar });

		setAvatar('');
	}

	function useChanglerAvatar(evt) {
		setAvatar(evt.target.value);
	}

	return (
		<PopupWithForm
			name='avatar'
			title='Обновить аватар'
			buttonText='Сохранить'
			isOpen={props.isOpen}
			isClosed={props.isClosed}
			onSubmit={useSubmit}
		>
			<input
				type='url'
				name='avatar'
				placeholder='Ссылка на картинку'
				className='popup__input popup__input_avatar-link'
				id='avatar-link'
				required=''
				onChange={useChanglerAvatar}
				value={avatar || ''}
			/>
			<span className='avatar-link-error popup__input-error'>
				вы пропустили поле.
			</span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
