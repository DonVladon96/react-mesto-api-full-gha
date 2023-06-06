import React, { useState } from 'react';

function PopupWithForm(props) {


	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen && 'popup_opened'
			}`}
		>
			<div className='popup__container'>
				<button
					type='button'
					aria-label='Закрыть попап'
					className='popup__close'
					onClick={props.isClosed}
				></button>
				<form
					className='popup__form'
					name={props.name}
					onSubmit={props.onSubmit}
				>
					<h2 className='popup__title'>{props.title}</h2>
					{props.children}
					<button
						type='submit'
						className={`popup__submit-button popup__submit-button_type_${props.name}`}
					>
						{props.buttonText || 'Сохранить'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
