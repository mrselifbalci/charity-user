import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
	const [news, setNews] = useState([]);
	const [page, setPage] = useState(1);
	const [slider, setSlider] = useState([]);
	const [url, setUrl] = useState();

	useEffect(() => {
		axios
			.get('https://charity-backend-july.herokuapp.com/slider/type/latest-news')
			.then((res) => {
				setSlider(res.data.data[0]);
				setUrl(slider.mediaId.url);

				console.log(slider);
			})
			.catch((err) => console.log(err));
		axios
			.get(`https://charity-backend-july.herokuapp.com/news?page=${page}&limit=2`)
			.then((res) => {
				setNews(res.data.data);
				console.log(news);
			})
			.catch((err) => console.log(err));
	}, [url]);
	return (
		<div>
			<div
				className='latest-news-header-image'
				style={{ backgroundImage: `url(${url})` }}></div>
			<div className='latest-news-header-img-quote'>
				<span>{slider.quote}</span>
			</div>
			<div className='latest-news-header-title'>{slider.title}</div>
			<div className='latest-news-container'>
				{news.map((newsItem) => (
					<div className='latest-news-single-news-container'>
						<img src={newsItem.mediaId.url} alt='latest-news-pic' />
						<div>
							<h2 className='latest-news-single-news-title'>
								{newsItem.title}
							</h2>
							<p className='latest-news-single-news-content'>
								{newsItem.content.split(' ').slice(0, 90).join(' ')}
							</p>
							<button className='latest-news-single-news-read-more-btn'>
								Read More
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default News;
