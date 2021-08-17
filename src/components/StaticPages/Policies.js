import React, {useEffect, useState} from 'react';
import './Policies.css';
import imageHeader from '../GetInvolved/DonateGoods/Rectangle 26.png';
import axios from 'axios';

const Policies = () => {
	const [state, setState] = useState('')
	useEffect(() => {
		axios.get(`http://localhost:5001/staticpage/name/Privacy & Cookie Policies`)
			.then(data => {
				setState(data.data.data)
				document.querySelector('#content').innerHTML = data.data.data.content
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div>
			<div className="ambassadorForm-container">
				<img src={imageHeader} alt="Avatar" className="ambassadorForm-image" />
				<div className="ambassadorForm-overlay">
					<h1 className="ambassadorForm-text" id="privacytitle">{state.name}</h1>
				</div>
			</div>
		
			
			<div id="content">
			</div>
			
				
			
		</div>
	);
};

export default Policies;
