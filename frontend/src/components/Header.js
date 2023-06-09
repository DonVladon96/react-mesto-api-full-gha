import React from "react";
import logo from '../images/logo.svg';

function Header({ isWrapperForHeader, children }) {
	return (
		<header
			className={'header section_size_narrow' + (isWrapperForHeader ? '' : '')}
		>
			<img src={logo} className='header__logo' alt='Mesto logo' />

			{isWrapperForHeader && (
				<button
					type='button'
					className='header__menu-button'
					aria-label='Menu'
				></button>
			)}

			{children && (
				<nav
					className=
						'header__menu'

				>
					<ul className='header__menu-li'>
						{(children.length > 1 ? children : [children]).map((item, pos) => (
							<li className='header__menu-item' key={pos}>
								{item}
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
}

export default Header;
