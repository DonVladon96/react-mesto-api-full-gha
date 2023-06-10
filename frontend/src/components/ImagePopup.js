import React from 'react';


function ImagePopup({isOpen, isClosed, card, closePopupsOnOutsideClick}) {
	return (
		<div
			className={`popup popup_image-open ${isOpen ? 'popup_opened' : ''}`}
			onClick={closePopupsOnOutsideClick}
		>
			<div className='popup__container popup__container_image'>
				<button
					type='button'
					aria-label='Закрыть картинку'
					className='popup__close popup__close-image'
					onClick={isClosed}
				/>
				<div className='popup__wrapper'>
					<img
						src={card.link}
						alt={card.name}
						className='popup__image'
					/>
					<p className='popup__caption'>{card.name}</p>
				</div>
			</div>
		</div>
	);
}

export default ImagePopup;
