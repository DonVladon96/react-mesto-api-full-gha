import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import auth from '../utils/auth';

function Login({ handleShowInfoMessage, onLogin }) {
	const startValues = {
		email: '',
		password: ''
	};

	const [inputs, setInputs] = useState(startValues);


	function handleChangeValue(evt) {
		const value = evt.target.value;
		const name = evt.target.name;
		setInputs((state) => ({ ...state, [name]: value }));
	}

	function handleSubmitValue(evt) {
		evt.preventDefault();
		onLogin(inputs, restartForm);
	}

	function restartForm() {
		setInputs({ ...startValues });
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
							value={inputs.email}
							name='email'
							onChange={handleChangeValue}
							required
						/>
						<input
							type='password'
							className='initial-window__input'
							name='password'
							placeholder='password'
							value={inputs.password}
							onChange={handleChangeValue}
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
