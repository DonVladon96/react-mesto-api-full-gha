import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithVerification({isClosed, isOpen, onSubmit }) {

	return (
		<PopupWithForm
			name='delete-card'
			title='Вы уверены?'
			buttonText='Да'
			isOpen={isOpen}
			isClosed={isClosed}
			onSubmit={onSubmit}>
		</PopupWithForm>
	);
}

export default PopupWithVerification;