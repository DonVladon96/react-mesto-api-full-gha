import React from 'react';

function ImagePopup(props) {
	return (
		<div
			className={`popup popup_image-open ${props.isOpen ? 'popup_opened' : ''}`}
		>
			<div className='popup__container popup__container_image'>
				<button
					type='button'
					aria-label='Закрыть картинку'
					className='popup__close popup__close-image'
					onClick={props.isClosed}
				/>
				<div className='popup__wrapper'>
					<img
						src={props.card.link}
						alt={props.card.name}
						className='popup__image'
					/>
					<p className='popup__caption'>{props.card.name}</p>
				</div>
			</div>
		</div>
	);
}

export default ImagePopup;
