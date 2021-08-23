import './SearchResults.css';
import React, { useState, useEffect } from 'react';

const SearchResults = ({ searchResults }) => {
	const [news, setNews] = useState([]);
	useEffect(() => {
		setNews(searchResults);
	}, [searchResults]);

	return (
		<div className='search-results-main'>
			<div className='search-results-text'>
				<p>Search Results</p>
			</div>
			<div className='search-results-container'>
				{news.map((newsItem) => (
					<div className='search-results-single-news-container'>
						<div className='search-results-single-news-img-container'>
							<img
								src={newsItem.mediaId.url}
								alt='search-results-pic'
								className='search-results-single-news-img'
							/>
						</div>
						<div>
							<h1 className='search-results-single-news-title'>
								{newsItem.title}
							</h1>
							<p className='search-results-single-news-content-large-size'>
								{newsItem.summary && newsItem.summary.slice(0, 550)}...
								{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
							<p className='search-results-single-news-content-medium-size'>
								{newsItem.summary && newsItem.summary.slice(0, 350)}...
								{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
							<p className='search-results-single-news-content-small-size'>
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
			</div>
		</div>
	);
};

export default SearchResults;
