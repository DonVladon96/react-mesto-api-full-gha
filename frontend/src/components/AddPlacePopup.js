import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const [cardName, setCardName] = useState('');
	const [cardLink, setCardLink] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		props.onAddCards({ name: cardName, link: cardLink });
	}

	useEffect(() => {
		return () => {
			setCardName('');
			setCardLink('');
		};
	}, [props.isOpen]);

	function handlePutName(evt) {
		setCardName(evt.target.value);
	}

	function handlePutLink(evt) {
		setCardLink(evt.target.value);
	}

	return (
		<PopupWithForm
			name='cardName'
			title='Новое место'
			buttonText='Создать'
			isOpen={props.isOpen}
			isClosed={props.isClosed}
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				name='cardName'
				placeholder='Название?'
				className='popup__input'
				id='card-name'
				minLength={2}
				maxLength={30}
				required=''
				onChange={handlePutName}
				value={cardName}
			/>
			<span className='card-name-error popup__input-error'>
				вы пропустили поле.
			</span>
			<input
				type='url'
				name='cardLink'
				placeholder='Ссылка на картинку'
				className='popup__input'
				id='card-link'
				required=''
				onChange={handlePutLink}
				value={cardLink}
			/>
			<span className='card-link-error popup__input-error'>
				вы пропустили поле.
			</span>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
