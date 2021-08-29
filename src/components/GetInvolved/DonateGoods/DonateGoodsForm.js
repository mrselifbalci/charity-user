import React, { useState, useLayoutEffect } from 'react';
import imageHeader from './Rectangle 26.png';
import './DonateGoodsForm.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DonateGoodsForm = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [phone, setPhone] = useState('');
	const [typeOfGoods, setTypeOfGoods] = useState('');
	const [numberOfPieces, setNumberOfPieces] = useState('');
	const [address, setAddress] = useState('');
	const [postcode, setPostcode] = useState('');
	const [instructions, setInstructions] = useState('');
	const [userId, setUserId] = useState(
		JSON.parse(sessionStorage.getItem('userInfo')).id
	);

	useLayoutEffect(() => {
		window.scroll(0, 0);
	}, []);

	const makeAnotherDonation = () => {
		window.scroll(0, 0);
		setModalIsOpen(false);
	};

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.post('https://charity-backend-july.herokuapp.com/donations', {
				phone,
				type_of_goods: typeOfGoods,
				number_of_pieces: numberOfPieces,
				address: address,
				postcode,
				instructions,
				userId,
				type: 'good',
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		setPhone('');
		setTypeOfGoods('');
		setNumberOfPieces('');
		setAddress('');
		setPostcode('');
		setInstructions('');
		setModalIsOpen(true);
	};

	return (
		<div>
			<div className='donate-goods-header-container'>
				<img
					src={imageHeader}
					alt='Avatar'
					className='donate-goods-header-image'
				/>
				<div className='donate-goods-header-overlay'>
					<h1 className='donate-goods-header-text'>Donate Goods</h1>
				</div>
			</div>
			<div className='donate-goods-form-container'>
				<form onSubmit={submitForm}>
					<div className='donate-goods-form'>
						<div className='donate-goods-form-row1'>
							<div className='donate-goods-form-row1-item'>
								<label>
									Phone
									<span className='donate-goods-form-contact-no-format'></span>
								</label>
								<input
									type='tel'
									className='donate-goods-form-contact-no-input'
									placeholder='Enter contact number'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									required
								/>
							</div>

							<div className='donate-goods-form-row1-item'>
								<label>Type of goods</label>
								<input
									type='text'
									placeholder='Enter type of goods (books,clothes etc.)'
									value={typeOfGoods}
									onChange={(e) => setTypeOfGoods(e.target.value)}
									required
								/>
							</div>
							<div className='donate-goods-form-row1-item'>
								<label>Quantity</label>
								<input
									placeholder='Enter number or amount'
									value={numberOfPieces}
									onChange={(e) => setNumberOfPieces(e.target.value)}
									required
								/>
							</div>
							<div className='donate-goods-form-row1-item'>
								<label>Post Code</label>
								<input
									type='text'
									placeholder='Enter the post code'
									value={postcode}
									onChange={(e) => setPostcode(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className='donate-goods-form-row2'>
							<div className='donate-goods-form-row2-item'>
								<label>Address</label>
								<textarea
									type='text'
									placeholder='Enter the full address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									required
								/>
							</div>

							<div className='donate-goods-form-row2-item'>
								<label>Instructions for the Driver</label>
								<textarea
									type='text'
									placeholder='Enter a clear instruction for the driver '
									value={instructions}
									onChange={(e) => setInstructions(e.target.value)}
									required
								/>
							</div>
						</div>
					</div>
					<div className='donate-goods-form-submit-container'>
						<button
							type='submit'
							className='donate-goods-form-submit-btn'
							onClick={() => window.scroll(0, 0)}>
							Submit
						</button>
					</div>
				</form>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				className='donate-goods-form-modal'>
				<span className='donate-goods-form-modal-text'>
					Thank you! <br />
					Your donation is currently under review. Once approved, you will be
					contacted via email regarding the collection time in your area
				</span>
				<br />
				<br />
				<button
					to='/getinvolved/donategoods-form'
					className='donate-goods-form-btn-popup'
					onClick={() => {
						makeAnotherDonation();
						window.scroll(0, 0);
					}}>
					Make Another Donation
				</button>
				<br />
				<Link to='/' className='donate-goods-form-btn-popup'>
					Back to Home Page
				</Link>
			</Modal>
		</div>
	);
};

export default DonateGoodsForm;
