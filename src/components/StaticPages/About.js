import React, {useEffect, useState} from 'react';
import './About.css';
import imageHeader from '../GetInvolved/DonateGoods/Rectangle 26.png';
import axios from 'axios';

const About = () => {
	const [state, setState] = useState('')
	useEffect(() => {
		axios.get(`http://localhost:5001/staticpage/name/About us`)
			.then(data => {
				setState(data.data.data)
			})
			.catch(err => console.log(err))

	}, [])
	useEffect(() => {
		window.scroll(0, 0);
	}, []);


	return (
		<div>
			<div className="ambassadorForm-container">
				<img src={imageHeader} alt="Avatar" className="ambassadorForm-image" />
				<div className="ambassadorForm-overlay">
					<h1 className="ambassadorForm-text" id="aboutus-header">{state.name}</h1>
				</div>
			</div>
			<div className="aboutus-content">
				{state.content}
			</div>
		</div>
	);
};

export default About;
