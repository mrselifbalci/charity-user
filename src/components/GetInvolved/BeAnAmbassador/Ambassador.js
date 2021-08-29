import React, { useEffect, useState } from 'react';

import './Ambassador.css';
import './AmbassadorForm.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Ambassador = ({ isLoggedIn }) => {
	const history = useHistory();

	function handleClick() {
		if (isLoggedIn) {
			history.push('/getinvolved/beanambassador-form');
		} else {
			history.push('/login');
		}
	}

	const [image, setImage] = useState();
	const [ambassador, setAmbassador] = useState('');

	useEffect(() => {
		axios
			.get(
				'https://charity-backend-july.herokuapp.com/getinvolved/title/Be an Ambassador'
			)
			.then((res) => setAmbassador(res.data.data[0]))
			.catch((err) => console.log(err));

		axios
			.get('https://charity-backend-july.herokuapp.com/slider/type/ambassador')
			.then((res) => {
				setImage(res.data.data[0].mediaId.url);
			})
			.catch((err) => console.log(err));
	}, [image]);

	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		<div className='mainContainerambass'>
			<div className='ambassadorForm-container'>
				<img src={image} alt='Avatar' className='ambassadorForm-image' />
				<div className='ambassadorForm-overlay'>
					<h1 className='ambassadorForm-text' id='h1-content'>
						{ambassador.title}
					</h1>
				</div>
			</div>
			<div className='contentAmb'>
				{ambassador.content}

				<button onClick={handleClick} className='apply-btn-Amb'>
					{ambassador.buttonText}
				</button>
			</div>
		</div>
	);
};

export default Ambassador;
