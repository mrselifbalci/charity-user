import React, { useState, useEffect } from 'react';
import './About.css';
import imageHeader from '../../GetInvolved/DonateGoods/Rectangle 26.png';
import axios from 'axios';

const About = () => {
	const [state, setState] = useState('')

	useEffect(() => {
		axios.get(`http://localhost:5001/staticpage/name/Terms & Conditions`)
			.then(data => setState(data.data.data))
			.catch(err => console.log(err))
	}, [])
	return (
		<div>
			<div className="about-container">
				<img src={imageHeader} alt="Avatar" className="about-image" />
				<div className="about-overlay">
					<h1 className="about-text" id="h1-content">About us</h1>
				</div>
			</div>
			<div className="aboutus-content">
				
			</div>
			<div className="btn-search-compare-container">
				<a href="/">
					<button
						className="btn-search-compare"
						onClick={() => window.scroll(0, 0)}
					>
						Search and Compare
					</button>
				</a>
			</div>
		</div>
	);
};

export default About;
