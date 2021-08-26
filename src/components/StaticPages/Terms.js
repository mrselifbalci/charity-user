import React, {useEffect, useState} from 'react';
import './Terms.css';
import imageHeader from '../GetInvolved/DonateGoods/Rectangle 26.png';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';




const Terms = () => {
	const [state, setState] = useState('')
	const {param} = useParams()
	
	useEffect(() => {
		axios.get(`https://charity-backend-july.herokuapp.com/staticpage/name/${param}`)
			.then(data => {
				setState(data.data.data)
			})
			.catch(err => console.log(err))
			console.log(param)
	}, [param])
	useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		
		<div className="terms-content-container">
				<div className="staticpages-container">
				<img src={imageHeader} alt="Avatar" className="staticpages-image" />
				<div className="staticpages-overlay">
					<p className="staticpages-text" id="termstitle">{state.name}</p>
				</div>
			</div>
			<div className="terms-maincontent">
			{ReactHtmlParser(state.content)}
			</div>
			
		</div>
	);
};

export default Terms;
