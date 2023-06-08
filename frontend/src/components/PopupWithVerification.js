import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithVerification(props) {

	return (
		<PopupWithForm
			name='delete-card'
			title='Вы уверены?'
			buttonText='Да'
			isOpen={props.isOpen}
			isClosed={props.isClosed}
			onSubmit={props.onSubmit}>
		</PopupWithForm>
	);
}

export default PopupWithVerification;