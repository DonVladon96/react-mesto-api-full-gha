import {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from "../utils/validations";

function AddPlacePopup({isClosed, onAddCards, isOpen}) {
    const {values, errors, onChange, restartForm} = useFormValidation();

    function handleSubmit(e) {
        e.preventDefault();

        onAddCards(values);
    }

    useEffect(() => {
        restartForm();
    }, [isOpen]);


    return (
        <PopupWithForm
            name='cardName'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            isClosed={isClosed}
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                name='name'
                placeholder='Название?'
                className='popup__input'
                id='card-name'
                minLength='2'
                maxLength='30'
                required
                onChange={onChange}
                value={values.name || ''}
            />
            <span className='card-name-error popup__input-error'>
				{errors.name || ''}
			</span>
            <input
                type='url'
                name='link'
                placeholder='Ссылка на картинку'
                className='popup__input'
                id='card-link'
                required
                onChange={onChange}
                value={values.link || ''}
            />
            <span className='card-link-error popup__input-error'>
				{errors.link || ''}
			</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
