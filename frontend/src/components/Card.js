import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, openCard, deleteCard, cardLike }) {
	const currentUser = useContext(CurrentUserContext);

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some(i => i._id === currentUser._id);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = (card.owner._id || card.owner) === currentUser._id;

	function handleClickCard() {
		openCard(card);
	}

	function handleLikeClick() {
		cardLike(card);
	}

	function handleDeleteClick() {
		deleteCard(card);
	}

	return (
		<article className='element'>
			<button
				type='button'
				aria-label='button-delete'
				className={`element__button-trash ${isOwn ? `element__button-trash_visible` : ''}`}
				onClick={handleDeleteClick}
			/>
			<img
				src={card.link}
				alt={card.name}
				onClick={handleClickCard}
				className='element__photo'
			/>
			<div className='element__photo-info'>
				<h2 className='element__title'>{card.name}</h2>
				<div className='element__like-container'>
					<button
						type='button'
						aria-label='Like'
						className={`element__button-like ${
							isLiked ? `element__button-like_active` : ''
						}`}
						onClick={handleLikeClick}
					/>
					<div className='element__like-number'>{card.likes.length}</div>
				</div>
			</div>
		</article>
	);
}

export default Card;
