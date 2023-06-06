import React from 'react';

function InfoTooltip(
	{ message, isClosed, isOpened, closePopupsOnOutsideClick },
	props
) {
	return (
		<div
			className={`popup ` + (message ? 'popup_opened' : '')}
			onClick={closePopupsOnOutsideClick}
		>
			<div className='popup__container  section_size_narrow'>
				<div className='popup__container'>
					<button
						type='button'
						aria-label='Закрыть попап'
						className='popup__close'
						onClick={props.isClosed}
					></button>
					<form className='popup__form'>
						<p
							className={
								'popup__information-message' +
								(message
									? message.isSuccess
										? ' popup__information-message_success'
										: ' popup__information-message_fail'
									: '')
							}
						>
							{message ? message.text : ' '}
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default InfoTooltip;
