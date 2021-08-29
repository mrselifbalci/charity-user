import React, { useEffect, useState } from 'react';
import imageHeader from '../DonateGoods/Rectangle 26.png';
import './AmbassadorForm.css';
import Modal from 'react-modal';
import { useHistory } from 'react-router';
import axios from 'axios';

const customStyles = {
	content: {
		position: 'absolute',
		top: '38%',
		left: '50%',
		right: '50%',
		bottom: '60%',
		marginRight: '-50%',
		marginTop: '120px',
		transform: 'translate(-50%, -50%)',
		height: 'fit-content',
		backgroundColor: '#76A9C7',
		padding: '10px',
		width: '40%',
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 'large',
		lineHeight: '28px',
		color: 'white',
		marginBottom: '450px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
};

const AmbassadorForm = () => {
	const [phone, setPhone] = useState('');
	const [city, setCity] = useState('');
	const [reason, setReason] = useState('');
	const [interested_in, setInterestedIn] = useState('');
	const [comment, setComment] = useState('');
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [userId, setUserId] = useState(
		JSON.parse(sessionStorage.getItem('userInfo')).id
	);

	const makeAnotherDonation = () => {
		window.scroll(0, 0);
		setIsOpen(false);
	};
	const history = useHistory();

	function closeModal() {
		setIsOpen(false);
	}
	function afterOpenModal() {}

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const submit = (e) => {
		e.preventDefault();
		axios
			.post('https://charity-backend-july.herokuapp.com/donations', {
				phone,
				city,
				reason_to_join: reason,
				interested_in,
				comments: comment,
				userId,
				type: 'ambassador',
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		setPhone('');
		setCity('');
		setReason('');
		setInterestedIn('');
		setComment('');
		setIsOpen(true);
	};
	function setInputFilter(textbox, inputFilter) {
		[
			'input',
			'keydown',
			'keyup',
			'mousedown',
			'mouseup',
			'select',
			'contextmenu',
			'drop',
		].forEach(function (event) {
			if (textbox) {
				textbox.addEventListener(event, function () {
					if (inputFilter(this.value)) {
						this.oldValue = this.value;
						this.oldSelectionStart = this.selectionStart;
						this.oldSelectionEnd = this.selectionEnd;
					} else if (this.hasOwnProperty('oldValue')) {
						this.value = this.oldValue;
						this.setSelectionRange(
							this.oldSelectionStart,
							this.oldSelectionEnd
						);
					} else {
						this.value = '';
					}
				});
			}
		});
	}
	setInputFilter(document.getElementById('ambassador-contact'), function (value) {
		return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
	});

	return (
		<div>
			<div className='ambassadorForm-container'>
				<img src={imageHeader} alt='Avatar' className='ambassadorForm-image' />
				<div className='ambassadorForm-overlay'>
					<h1 className='ambassadorForm-text' id='h1-content'>
						Be an Ambassador
					</h1>
				</div>
			</div>
			<div className='ambassador-form-content'>
				<form className='ambassador-form' onSubmit={submit}>
					<div className='ambassador-row1'>
						<div>
							<label htmlFor='ambassador-contact'>Contact Number</label>
							<input
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								type='tel'
								id='ambassador-contact'
								name='ambassador-contact'
								placeholder='Enter your contact number'
							/>
						</div>
						<div>
							<label htmlFor='ambassador-based'>Where are you based?</label>
							<input
								required
								value={city}
								type='text'
								id='ambassador-based'
								name='ambassador-based'
								placeholder='Enter the city name'
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
					</div>

					<div className='ambassador-row2'>
						<div>
							<label htmlFor='ambassador-reason'>
								Why do you want to join us?
							</label>{' '}
							<br />
							<textarea
								required
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								type='text'
								id='ambassador-reason'
								name='ambassador-reason'
							/>
						</div>
						<div>
							<label htmlFor='ambassador-particular'>
								What particular areas are you willing to contribute to or
								interest you the most?
							</label>
							<textarea
								required
								value={interested_in}
								onChange={(e) => setInterestedIn(e.target.value)}
								type='text'
								id='ambassador-particular'
								name='ambassador-particular'
							/>
						</div>
					</div>
					<div className='ambassador-row3'>
						<label htmlFor='ambassador-comment'>
							Other thoughts or comments(optional):
						</label>
						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							type='text'
							id='ambassador-comment'
							rows='8'
							name='ambassador-comment'
						/>
					</div>

					<div className='ambassador-row4'>
						<button type='submit' onClick={() => window.scroll(0, 0)}>
							Submit
						</button>
					</div>
				</form>
			</div>
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				contentLabel='Example Modal'>
				<p>Thank you! You have just made a difference in someone else’s life! </p>
				<button
					className='donate-goods-form-btn-popup'
					onClick={() => makeAnotherDonation()}>
					Make another donation
				</button>
				<button
					className='donate-goods-form-btn-popup'
					onClick={() => history.push('/')}>
					Back to home page
				</button>
			</Modal>
		</div>
	);
};

export default AmbassadorForm;
