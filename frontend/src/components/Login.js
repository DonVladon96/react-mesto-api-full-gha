import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import useFormValidation from '../utils/validations'

function Login({  onLogin }) {
	const { values, errors , onChange } = useFormValidation();

	function handleSubmitValue(evt) {
		evt.preventDefault();

		onLogin(values.email, values.password);
	}

	return (
		<>
			<Header>
				<Link to='/sign-up' className='header__menu-item'>
					Регистрация
				</Link>
			</Header>
			<main>
				<div className='initial-window section_size_narrow'>
					<h1 className='initial-window__title'> Вход </h1>
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
							name='password'
							placeholder='password'
							value={values.password || ''}
							onChange={onChange}
							required
						/>
						<button type='submit' className='initial-window__submit-button'>
							Вход
						</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default Login;
