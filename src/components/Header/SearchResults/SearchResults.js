import './SearchResults.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

 
const SearchResults = ({ searchResults}) => {
	// const {id} =useParams();
	const [posts, setPosts] = useState([])
	const [viewmore, setViewmore] = useState(0);
	useEffect(() => {
        setPosts(searchResults)
	}, [searchResults]);
 
	// const viewMore = () => {
	// 	if (posts.length - 2 <= viewmore) {
	// 		document.querySelector('.allPosts').textContent =
	// 			'No more stories to view...';
	// 	} else {
	// 		setViewmore(viewmore + 2);
	// 	}
	// };

	return (
		<div className='search-results-main'>
			
			<div className="search-results-text">
				<p>Search Results</p>
			</div>
			<div className="search-results-content-area">
			<table id="news-area">
				<br />
				{posts.map((newsItem) => (
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
							<p className='latest-news-single-news-content'>
								{newsItem.summary.slice(0, 250)}...{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
							<p className='latest-news-single-news-content-small-size'>
								{newsItem.summary.slice(0, 100)}...{'  '}
								<small>
									<a href={`/newsdetail/${newsItem._id}`}>
										continue reading &raquo;
									</a>
								</small>
							</p>
						</div>
					</div>
				))}<br/>
				{/* <tr className="allPosts"></tr>
				<tr className="tr-btn-viewmore">
				
					<button id="news-btn-viewmore" onClick={viewMore}>View More</button>
				</tr> */}
			</table>
			</div>
		</div>
	);
};

export default SearchResults;
