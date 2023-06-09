import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({  onRegister }) {
	const { values, errors, onChange } = useFormValidation();

	function handleSubmitValue(evt) {
		evt.preventDefault();
		onRegister(values.email, values.password);
	}

	return (
		<>
			<Header>
				<Link to='/sign-in' className='header__menu-item'>
					Войти
				</Link>
			</Header>

			<main>
				<div className='initial-window section_size_narrow'>
					<h2 className='initial-window__title'> Регистрация </h2>
					<form
						className='initial-window__form'
						onSubmit={handleSubmitValue}
					>
						<input
							type='email'
							className='initial-window__input'
							placeholder='Email'
							value={values.email || ''}
							name='email'
							onChange={onChange}
							required
						/>
						<span className='initial-window__input-error'>{errors.email || ''}</span>
						<input
							type='password'
							className='initial-window__input'
							placeholder='Password'
							name='password'
							value={values.password || ''}
							onChange={onChange}
							required
						/>
						<span className='initial-window__input-error'>{errors.email || ''}</span>
						<button type='submit' className='initial-window__submit-button'>
							Регистрация
						</button>
					</form>
					<p className='initial-window__span-text'>
						Уже зарегистрированы?{' '}
						<Link className='initial-window__link' to='/sing-in'>
							Войти
						</Link>
					</p>
				</div>
			</main>
		</>
	);
}

export default Register;
