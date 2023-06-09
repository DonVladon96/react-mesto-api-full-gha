import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithVerification from './PopupWithVerification';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import Api from "../utils/Api";
import auth from '../utils/Auth';

import InfoTooltip from './InfoTooltip';

function App() {
    //использую хуки, чтобы задать начальное состояние(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopup, setConfirmDeletePopup] = useState(false);
    const [isCardOpen, setCardOpen] = useState(false);
    const [isSelectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCard] = useState([]);

    const [currentCard, setCurrentCard] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [isInfoMessage, setInfoMessage] = useState(null);
    const navigate = useNavigate();

    const api = new Api({
        url: "https://api.donvladon.nomoredomains.rocks",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    });

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                navigate('/');
                setInfoMessage('Вы успешно вошли!')
                handleShowInfoMessage({
                    text: 'Вы успешно вошли!',
                    isSuccess: true
                })
                setTimeout(closeAllPopups, 1500);
            })
            .catch(() => {
                const text = 'Что-то пошло не так! Попробуйте еще раз.';
                handleShowInfoMessage({
                    text: text,
                    isSuccess: false
                });
            });
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                navigate('/sign-in');
                handleShowInfoMessage({
                    text: 'Вы успешно зарегистрировались!',
                    isSuccess: true
                });

            })
            .catch((error) => {
                const text = 'Что-то пошло не так! Попробуйте еще раз.';
                handleShowInfoMessage({
                    text: text,
                    isSuccess: false
                });
            });
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    console.log(
                        `Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`
                    );
                })
        }
    }, []);


    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate])

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then((data) => {
                    const [userData, cardsData] = data;

                    setCurrentUser(userData);
                    setUserEmail(userData.email);

                    setCard(cardsData);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        }
    }, [loggedIn]);

    function handleLogout() {
        setLoggedIn(false);
        setUserEmail('');
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    function handleOpenCardClick(cardsData) {
        setCardOpen(true);
        setSelectedCard({name: cardsData.name, link: cardsData.link});
    }

    function handleConfirmDeletePopup(card) {
        setConfirmDeletePopup(true);
        setCurrentCard(card);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleShowInfoMessage(message) {
        setInfoMessage(message);
    }

    function closeAllPopups() {
        setCardOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setConfirmDeletePopup(false);
        setInfoMessage(null);
        setSelectedCard({name: '', link: ''});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.toggleLike(card._id, !isLiked).then((newCard) => {
            setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateUser(values) {
        setIsLoading(true);

        api.parseUserInfo({name: values.name, about: values.about})
            .then((response) => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => setIsLoading(false));
    }

    function handleChangeAvatar(values) {
        setIsLoading(true);

        api.updateUserAvatar({avatar: values.avatar})
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => setIsLoading(false));
    }


    function handleAddPlacePopup(values) {
        setIsLoading(true);

        api.createCard({name: values.name, link: values.link})
            .then((newCard) => {
                setCard([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => setIsLoading(false));
    }

    function handleCardDelete(event) {
        setIsLoading(true);

        event.preventDefault();

        api
            .deleteCard(currentCard._id)
            .then(() => {
                setCard(cards.filter((c) => c !== currentCard));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => setIsLoading(false));
    }

    function closePopupsOnOutsideClick(evt) {
        const target = evt.target;
        const checkSelector = (selector) => target.classList.contains(selector);

        if (checkSelector('popup_opened') || checkSelector('popup__close')) {
            closeAllPopups();
        }
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='main-page'>
                {/*<Header*/}
                {/*	userEmail={userEmail}*/}
                {/*/>*/}
                <Routes>
                    <Route path='/sign-in' element={
                        <Login
                            handleShowInfoMessage={handleShowInfoMessage}
                            onLogin={handleLogin}
                        />
                    }
                    ></Route>
                    <Route path='/sign-up' element={
                        <Register
                            handleShowInfoMessage={handleShowInfoMessage}
                            onRegister={handleRegister}/>
                    }/>
                    <Route path='/' element={
                        <>
                            <ProtectedRoute
                                component={Main}
                                loggedIn={loggedIn}
                                openProfileEdit={handleEditProfileClick}
                                addButtonCard={handleAddPlaceClick}
                                openUserAvatar={handleEditAvatarClick}
                                openDeleteConfirm={handleConfirmDeletePopup}
                                openCard={handleOpenCardClick}
                                cardLike={handleCardLike}
                                cards={cards}
                                email={userEmail}
                                onLogout={handleLogout}
                            />
                            {/*Лоадер пока закомментирую*/}
                            {/*{isLoading ? (*/}
                            {/*	<WrapperForLoader>*/}
                            {/*		<Loader></Loader>*/}
                            {/*	</WrapperForLoader>*/}
                            {/*) : (<Main></Main>)}*/}
                            <Footer/>
                        </>
                    }/>
                </Routes>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    isClosed={closeAllPopups}
                    onSubmit={handleChangeAvatar}
                ></EditAvatarPopup>
                {/* для редактирования профиля */}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isClosed={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    currentUser={currentUser}
                ></EditProfilePopup>
                {/* для добавления карточек */}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    isClosed={closeAllPopups}
                    onAddCards={handleAddPlacePopup}
                ></AddPlacePopup>
                {/* для открытия картинки */}
                <ImagePopup
                    card={isSelectedCard}
                    isOpen={isCardOpen}
                    isClosed={closeAllPopups}
                    closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                ></ImagePopup>
                {/* для подтверждения удаления  */}
                <PopupWithVerification
                    isOpen={isConfirmDeletePopup}
                    isClosed={closeAllPopups}
                    onSubmit={handleCardDelete}
                    closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                ></PopupWithVerification>{' '}
                <InfoTooltip
                    message={isInfoMessage}
                    isClosed={closeAllPopups}
                    closePopupsOnOutsideClick={closePopupsOnOutsideClick}

                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
