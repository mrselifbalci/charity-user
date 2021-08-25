import React, { useState, useEffect } from 'react';
import './DonateYourTimeForm.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DonateYourTimeForm = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [phone, setPhone] = useState('');
	const [city, setCity] = useState('');
	const [interested_in, setInterestedIn] = useState('');
	const [comments, setComments] = useState('');
	const [url, setUrl] = useState('');
	const [slider, setSlider] = useState('');

	const API_BASE_URL = 'https://charity-backend-july.herokuapp.com';
	const userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/slider/type/donate-your-time`)
			.then((res) => {
				setSlider(res.data.data[0]);
				setUrl(res.data.data[0].mediaId.url);
			})
			.catch((err) => console.log(err));
		window.scroll(0, 0);
	}, []);

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.post(`${API_BASE_URL}/donations`, {
				phone,
				city,
				interested_in,
				comments,
				type: 'time',
				userId,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		setPhone('');
		setCity('');
		setInterestedIn('');
		setComments('');
		setModalIsOpen(true);
	};

	return (
		<div>
			<div
				className='donate_your_time_form_header'
				style={{ backgroundImage: `url(${url})` }}>
				<div className='donate_your_time_form_title'>
					<p>{slider.title}</p>
				</div>
			</div>
			<div className='donate_your_time_form_container'>
				<form onSubmit={submitForm}>
					<div className='donate_your_time_form'>
						<div className='donate_your_time_form_phone_city_container'>
							<div className='donate_your_time_form_phone_container'>
								<label htmlFor='number'>
									Contact Number
									<span
										className='donate_time_form_contact_num'
										style={{ fontSize: '14px' }}>
										<i>(Format XXX-XXXX-XXXX)</i>
									</span>
								</label>
								<br />
								<input
									value={phone}
									pattern='[0-9]{3}-[0-9]{4}-[0-9]{4}'
									onChange={(e) => setPhone(e.target.value)}
									type='phone'
									id='number'
									name='number'
									placeholder='Enter your contact number'
									required
								/>
							</div>

							<div className='donate_your_time_form_city_container'>
								<label htmlFor='based'>Where are you based?</label>
								<br />
								<input
									value={city}
									onChange={(e) => setCity(e.target.value)}
									type='text'
									id='based'
									name='based'
									placeholder='Enter the city name'
									required
								/>
							</div>
						</div>

						<div className='donate_your_time_form_interested_in_container'>
							<label htmlFor='text'>
								What particular areas are you willing to contribute to or
								interest you the most?
							</label>
							<br /> <br />
							<textarea
								value={interested_in}
								onChange={(e) => setInterestedIn(e.target.value)}
								type='text'
								id='text'
								name='text'
							/>
						</div>

						<div className='donate_your_time_form_comments_container'>
							<label htmlFor='text2'>Other thoughts or comments</label>{' '}
							<br /> <br />
							<textarea
								value={comments}
								onChange={(e) => setComments(e.target.value)}
								type='textarea'
								id='text2'
								name='text2'
								rows='10'
								cols='50'
							/>
						</div>

						<div className='donate_your_time_form_submit_btn_container'>
							<button
								type='submit'
								className='donate_your_time_form_submit_btn'>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
			<Modal
				className='donate_time_modal'
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {},
					content: {
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						top: '25%',
						left: '25%',
						right: '25%',
						height: 'fit-content',
						width: '40%',
						padding: '60px',
						textAlign: 'center',
						lineHeight: 1.8,
						backgroundColor: '#347ca5',
						color: 'white',
						fontSize: 20,
					},
				}}>
				Thank you for your interest! <br />
				We will be in touch with you soon.
				<br />
				<br />
				<br />
				<Link to='/' className='donate-time-form-btn-popup'>
					Back to Home Page
				</Link>
			</Modal>
		</div>
	);
};

export default DonateYourTimeForm;
