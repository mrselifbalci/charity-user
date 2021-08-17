import React, { useEffect, useState } from 'react';
import './Terms.css';
import imageHeader from '../../GetInvolved/DonateGoods/Rectangle 26.png';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Terms = ({match}) => {
	const [state, setState] = useState('')
	const {param} = useParams()
	
	useEffect(() => {
		axios.get(`http://localhost:5001/staticpage/name`)
			.then(data => setState(data.data.data))
			.catch(err => console.log(err))
			console.log(param)
	}, [])

	return (
		<div className="terms-content-container">
			<div className="about-container">
				<img src={imageHeader} alt="Avatar" className="about-image" />
				<div className="about-overlay">
					<h1 className="about-text" id="h1-content">{state.name}</h1>
				</div>
			</div>
			{state.content}
		</div>
	);
};

export default Terms;
