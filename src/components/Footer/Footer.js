import React, { useState, useEffect } from 'react';
import './Footer.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [savedMessage, setSavedMessage] = useState(false);
	const [subscriber, setSubscriber] = useState('');
	const [existingEmailMessage, setExistingEmailMessage] = useState(false);
	const API_BASE_URL = 'https://charity-backend-july.herokuapp.com/emaillist';

	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/email/${email}`)
			.then((res) => {
				setSubscriber(res.data.data);
			})
			.catch((err) => console.log(err));
	}, [email]);

	const subscribeLetter = async (e) => {
		e.preventDefault();

		if (subscriber.length === 0) {
			await axios
				.post(API_BASE_URL, {
					type: 'newsletter',
					firstname: firstName,
					lastname: lastName,
					email: email,
				})
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));

			setFirstName('');
			setLastName('');
			setEmail('');
			setSavedMessage(true);
			setExistingEmailMessage(false);
		} else {
			setExistingEmailMessage(true);
		}
	};

	return (
		<div>
			<div id='footer'>
				<h1 id='form-title'>Sign up for our newsletter</h1>
				<div id='form'>
					<form id='form-footer' onSubmit={subscribeLetter}>
						<input
							className='form-input'
							type='text'
							placeholder='First Name'
							required
							onChange={(e) => {
								setFirstName(e.target.value);
								setSavedMessage(false);
								setExistingEmailMessage(false);
							}}
							value={firstName}
						/>
						<input
							className='form-input'
							type='text'
							placeholder='Last Name'
							required
							onChange={(e) => {
								setLastName(e.target.value);
								setSavedMessage(false);
								setExistingEmailMessage(false);
							}}
							value={lastName}
						/>
						<input
							className='form-input'
							type='email'
							placeholder='Email'
							required
							onChange={(e) => {
								setEmail(e.target.value);
								setExistingEmailMessage(false);
								setSavedMessage(false);
							}}
							value={email}
						/>
						<button id='form-btn' type='submit'>
							Send
						</button>
					</form>
					<br />
					{savedMessage ? (
						<div>
							<h3 className='newsletter-saved-message'>
								Thank you for subscribing to our newsletter...
							</h3>
						</div>
					) : null}
					{existingEmailMessage ? (
						<div>
							<h3 className='newsletter-saved-message'>
								This email has already been subscribed....
							</h3>
						</div>
					) : null}
				</div>
			</div>
			<div className='footer-nav'>
				<ul>
					<Link to='/terms' className='footer-nav-links'>
						Terms & Conditions
					</Link>
					<Link to='/policies' className='footer-nav-links'>
						Privacy & Cookie Policies
					</Link>
					<Link to='/contact-us' className='footer-nav-links'>
						Contact Us
					</Link>
					<li className='footer-nav-links'>&copy;2021 SoftInnovas</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
