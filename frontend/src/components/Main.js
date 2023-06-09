import { useContext } from 'react';

import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({openUserAvatar, openProfileEdit, email, onLogout, addButtonCard, cards, openCard,openDeleteConfirm,cardLike }) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<Header isWrapperForHeader={true}>
				<p className='header__menu-item'>{email}</p>
				<button href='#' className='header__menu-item' onClick={onLogout}>
					Выйти
				</button>
			</Header>

			<main className='main-content'>
				<section className='profile section section_size_narrow'>
					<div
						className='profile__avatar-container'
						onClick={openUserAvatar}
					>
						<img
							src={currentUser.avatar}
							alt='Аватар'
							className='profile__avatar'
						/>
					</div>
					<div className='profile__info'>
						<div className='profile__name-content'>
							<h1 className='profile__name'>{currentUser.name}</h1>
							<button
								type='button'
								aria-label='Редактировать профиль'
								className='profile__edit'
								onClick={openProfileEdit}
							/>
						</div>
						<p className='profile__aboute'>{currentUser.about}</p>
					</div>
					<button
						type='button'
						aria-label='Добавить новую картинку'
						className='profile__add-button'
						onClick={addButtonCard}
					/>
				</section>
				{/* создать кард.жс */}
				<section className='elements'>
					{cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							openCard={openCard}
							deleteCard={openDeleteConfirm}
							cardLike={cardLike}
						/>
					))}
				</section>
			</main>
		</>
	);
}

export default Main;
