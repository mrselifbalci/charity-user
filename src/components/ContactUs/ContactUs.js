import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import axios from 'axios';
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram } from 'react-icons/ai';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const ContactUs = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [companyInfo, setCompanyInfo] = useState('');
	const [FBLink, setFBLink] = useState('');
	const [TwitterLink, setTwitterLink] = useState('');
	const [InstagramLink, setInstagramLink] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const API_BASE_URL = 'https://charity-backend-july.herokuapp.com';

	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/companyinfo`)
			.then((res) => {
				setCompanyInfo(res.data.response[0]);
				setFBLink(res.data.response[0].socialMedia[0].Facebook);
				setTwitterLink(res.data.response[0].socialMedia[1].Twitter);
				setInstagramLink(res.data.response[0].socialMedia[2].Instagram);
			})
			.catch((err) => console.log(err));
		window.scroll(0, 0);
	}, []);

	const submitMessage = (e) => {
		e.preventDefault();
		axios
			.post(`${API_BASE_URL}/messages`, {
				firstname: firstName,
				lastname: lastName,
				email,
				message,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		setFirstName('');
		setLastName('');
		setEmail('');
		setMessage('');
		setModalIsOpen(true);
	};

	const sendAnotherMessage = () => {
		window.scroll(0, 0);
		setModalIsOpen(false);
	};

	return (
		<div>
			<div className='contact-us-header-container'>
				<h1 className='contact-us-header-text'>Contact Us</h1>
			</div>
			<div className='contact-us-container'>
				<div className='contact-us-form-container'>
					<h3 className='contact-us-intro-text'>
						Please complete this enquiry form. We will try our best to respond
						within three working days.
					</h3>
					<form className='contact-us-form' onSubmit={submitMessage}>
						<label>First Name</label>
						<input
							type='text'
							placeholder='Enter your first name...'
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							required
						/>
						<label>Last Name</label>
						<input
							type='text'
							placeholder='Enter your last name...'
							onChange={(e) => setLastName(e.target.value)}
							value={lastName}
							required
						/>
						<label>Email Address</label>
						<input
							type='email'
							placeholder='Enter your email address...'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
						<label>Your Message</label>
						<textarea
							placeholder='Enter your message...'
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							required
						/>
						<button
							type='submit'
							className='contact-us-form-submit-btn'
							onClick={() => window.scroll(0, 0)}>
							Submit
						</button>
					</form>
				</div>
				<div className='contact-us-communication'>
					<div className='contact-us-communication-address'>
						<h2 className='contact-us-communication-address-title'>
							Address
						</h2>
						<h3 className='contact-us-communication-address-text'>
							{companyInfo.address}
						</h3>
					</div>
					<div className='contact-us-communication-phone'>
						<h2 className='contact-us-communication-phone-title'>Phone</h2>
						<h3 className='contact-us-communication-phone-text'>
							{companyInfo.phone}
						</h3>
					</div>
					<div className='contact-us-communication-follow-us'>
						<h2 className='contact-us-communication-follow-us-title'>
							Follow Us
						</h2>
						<div style={{ textAlign: 'center' }}>
							<a
								href={FBLink}
								target='_blank'
								rel='noreferrer'
								className='contact-us-communication-sm-logo-link'>
								<AiFillFacebook className='contact-us-communication-sm-logo' />
							</a>
							<a
								href={TwitterLink}
								target='_blank'
								rel='noreferrer'
								className='contact-us-communication-sm-logo-link'>
								<AiFillTwitterSquare className='contact-us-communication-sm-logo' />
							</a>
							<a
								href={InstagramLink}
								target='_blank'
								rel='noreferrer'
								className='contact-us-communication-sm-logo-link'>
								<AiOutlineInstagram className='contact-us-communication-sm-logo' />
								{console.log(InstagramLink)}
							</a>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				className='contact-us-form-modal'>
				<span className='contact-us-form-modal-text'>
					Thank you for contacting us!
					<br />
					Your message is currently under review. You will be contacted via
					email regarding your concern/request/suggestion...
				</span>
				<br />
				<br />
				<Link
					to='/contact-us'
					className='contact-us-form-btn-popup'
					onClick={sendAnotherMessage}>
					Send Another Message
				</Link>
				<br />
				<Link to='/' className='contact-us-form-btn-popup'>
					Back to Home Page
				</Link>
			</Modal>
		</div>
	);
};

export default ContactUs;
