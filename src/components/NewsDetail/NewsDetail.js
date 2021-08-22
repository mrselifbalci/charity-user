import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './NewsDetail.css';

export default function NewsDetail() {
	const API_BASE_URL = 'https://charity-backend-july.herokuapp.com';

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { id } = useParams();

	const [news, setNews] = useState([]);
	const [urlMainImage, setUrlMainImage] = useState('');
	const [urlProfilePic, setUrlProfilePic] = useState('');

	useEffect(() => {
		axios
			.get(`${API_BASE_URL}/news/${id}`)
			.then((res) => {
				setNews(res.data.data);
				setUrlMainImage(res.data.data.mediaId.url);
				setUrlProfilePic(res.data.data.quoteAuthorMedia.url);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<div>
			<div
				className='news-details-header-image'
				style={{ backgroundImage: `url(${urlMainImage})` }}></div>
			<div>
				<img
					src={urlProfilePic}
					alt='author-pic'
					className='news-details-author-img'
				/>
				<div className='news-details-quote-container'>
					<p className='news-details-quote'>
						"{news.quote}" <br />{' '}
						<span className='news-details-quote-author'>
							{news.quoteAuthor}
						</span>
					</p>
				</div>
			</div>
			<div className='news-details-news-title-container'>
				<h1 className='news-details-news-title'>{news.title}</h1>
				<p className='news-details-news-summary'>{news.summary}</p>
			</div>
		</div>
	);
}
