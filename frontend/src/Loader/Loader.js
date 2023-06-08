import React from 'react';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
	return (
		<div>
			<Watch
				height='280'
				width='280'
				radius='48'
				color='#4fa94d'
				wrapperStyle={{}}
				wrapperClassName=''
				visible={true}
				ariaLabel='loading'
			/>
		</div>
	);
};

export default Loader;
