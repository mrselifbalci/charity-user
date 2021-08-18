import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
	const [news, setNews] = useState([]);
	const [page, setPage] = useState(1);
	const [slider, setSlider] = useState([]);
	const [url, setUrl] = useState();
	const [navPages, setNavPages] = useState();

	useEffect(() => {
		axios
			.get('https://charity-backend-july.herokuapp.com/slider/type/latest-news')
			.then((res) => {
				setSlider(res.data.data[0]);
				setUrl(res.data.data[0].mediaId.url);
			})
			.catch((err) => console.log(err));
		axios
			.get(`https://charity-backend-july.herokuapp.com/news?page=${page}&limit=2`)
			.then((res) => {
				setNews(res.data.data);
				setNavPages(Math.ceil(res.data.total / 2));
			})
			.catch((err) => console.log(err));
	}, [url, page]);

	const pages = [];

	for (let i = 1; i <= navPages; i++) {
		pages.push(i);
	}

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
						<div className='latest-news-single-news-img-container'>
							<img
								src={newsItem.mediaId.url}
								alt='latest-news-pic'
								className='latest-news-single-news-img'
							/>
						</div>
						<div>
							<h1 className='latest-news-single-news-title'>
								{newsItem.title}
							</h1>
							<p className='latest-news-single-news-content-large-size'>
								{newsItem.summary && newsItem.summary.slice(0, 550)}...
								{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
							<p className='latest-news-single-news-content-medium-size'>
								{newsItem.summary && newsItem.summary.slice(0, 350)}...
								{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
							<p className='latest-news-single-news-content-small-size'>
								{newsItem.summary && newsItem.summary.slice(0, 130)}...
								{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
						</div>
					</div>
				))}
				<div className='latest-news-page-navigation'>
					<button
						className='latest-news-page-navigation-btn'
						onClick={(e) => {
							e.preventDefault();
							if (page > 1) {
								setPage(page - 1);
							} else {
								setPage(1);
							}
						}}>
						&laquo; Previous
					</button>
					<h3>
						{page} / {navPages}
					</h3>
					<button
						className='latest-news-page-navigation-btn'
						onClick={(e) => {
							e.preventDefault();
							if (page + 1 <= navPages) {
								setPage(page + 1);
							} else {
								setPage(navPages);
							}
						}}>
						Next &raquo;
					</button>
				</div>
				<div className='latest-news-go-to-page-container'>
					<label htmlFor='latest-news-go-to-page'>Go to Page</label>
					<input
						type='text'
						id='latest-news-go-to-page'
						onChange={(e) => {
							if (e.target.value >= 1 && e.target.value <= navPages) {
								setPage(e.target.value);
							} else {
								setPage(page);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default News;
