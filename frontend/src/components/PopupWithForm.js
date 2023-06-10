import React from 'react';

function PopupWithForm({name, isClosed, isOpen, onSubmit, title, buttonText, children}) {


	return (
		<div
			className={`popup popup_type_${name} ${
				isOpen && 'popup_opened'
			}`}
		>
			<div className='popup__container'>
				<button
					type='button'
					aria-label='Закрыть попап'
					className='popup__close'
					onClick={isClosed}
				></button>
				<form
					className='popup__form'
					name={name}
					onSubmit={onSubmit}
				>
					<h2 className='popup__title'>{title}</h2>
					{children}
					<button
						type='submit'
						className={`popup__submit-button popup__submit-button_type_${name}`}
					>
						{buttonText || 'Сохранить'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
