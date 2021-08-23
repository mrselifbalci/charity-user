import React, {useEffect, useState} from 'react';
import './Terms.css';
import imageHeader from '../GetInvolved/DonateGoods/Rectangle 26.png';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';




const Terms = () => {
	const [state, setState] = useState('')
	const {param} = useParams()
	
	useEffect(() => {
		axios.get(`https://charity-backend-july.herokuapp.com/staticpage/name/${param}`)
			.then(data => {
				setState(data.data.data)
				document.querySelector('.terms-maincontent').innerHTML = data.data.data.content
			})
			.catch(err => console.log(err))
			console.log(param)
	}, [param])
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		
		<div className="terms-content-container">
				<div className="ambassadorForm-container">
				<img src={imageHeader} alt="Avatar" className="ambassadorForm-image" />
				<div className="ambassadorForm-overlay">
					<h1 className="ambassadorForm-text" id="termstitle">{state.name}</h1>
				</div>
			</div>
			<div className="terms-maincontent">
			
			</div>
			
		</div>
	);
};

export default Terms;
