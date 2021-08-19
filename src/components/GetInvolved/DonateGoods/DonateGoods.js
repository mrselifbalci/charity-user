import React, { useEffect,useState } from 'react';
import './DonateGoods.css';

import Modal from 'react-modal';
import { Link} from 'react-router-dom';
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
	},
};

const DonateGoods = ({ isLoggedIn }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [slider, setSlider] = useState('');
	const [url, setUrl] = useState('');
	const [pageData, setPageData] = useState('');


	useEffect(() => {
		axios
			.get('https://charity-backend-july.herokuapp.com/slider/type/donate goods')
			.then((res) => {
				setSlider(res.data.data[0]);
				setUrl(res.data.data[0].mediaId.url);
			})
			.catch((err) => console.log(err));
		axios
			.get('https://charity-backend-july.herokuapp.com/getinvolved/title/Donate Goods')
			.then((res) => {
				setPageData(res.data.data[0]);
			})
			.catch((err) => console.log(err));
			console.log(pageData)

		window.scroll(0, 0);
	}, [url]);





	function closeModal() {
		setIsOpen(false);
	}
	function afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<div className="donate-goods">
			<div className="donate-goods-container">
				<img
					src={url}
					alt="Avatar"
					className="donate-goods-image"
				/>
				<div className="donate-goods-overlay">
					<h1 className="donate-goods-text">{slider.title}</h1>
				</div>
			</div>
			<div className="content">


{pageData.content}



				
				<div className="content2">
					<div className="content2-p">
					
						<p className="content2-p2" onClick={() => setIsOpen(true)}>
						{pageData.moreInfoLinkText}
						</p>
					</div>
					
				</div>
				<div className="donate-goods-btn-div">
					<Link
						to={isLoggedIn ? '/getinvolved/donategoods-form' : '/login'}
						className="donate-goods-btn"
					>
					{pageData.buttonText}
				</Link>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
				className="donate-goods-modal"
			>
				{pageData.moreInfoContent}

			</Modal>
		</div>
	);
};

export default DonateGoods;
