import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsHomePage.css';
import { Link } from 'react-router-dom';

const NewsHomePage = () => {
	const [posts, setPosts] = useState([]);
	

	useEffect(() => {
		axios
			.get('https://charity-backend-july.herokuapp.com/news')
			.then((res) => setPosts(res.data.data))
			.catch((err) => console.log(err));
	}, []);
 

 

	return (
		<div id="news-div">
			<span id="newsTitle">The difference you make</span>
		

			<div id="newsHomePage">
				{posts.map((post,index)=> index %2 === 0 ? 	<div className="news">
				
					<img
						className="news-img"
						src={posts.length !== 0 ? post.mediaId.url : undefined}
						alt={ post.mediaId.alt}
					/>
		
			<div className="news-text">
				<h2>{posts.length !== 0 ? post.title : undefined}</h2>

				<p>{posts.length !== 0 ? post.content : undefined}</p>

				<Link
					to={`/newsdetail/${
						posts.length !== 0 ? post._id:undefined
					}`}
				>
					<span className="news-btn">Read More</span>
				</Link>
			</div>
			<div
			style={{
				height: 30,
				backgroundColor: '#f2f2f2',
			}}
		></div> 
		</div> : <div>
			<div className="news">
				<div className="news-text">
					<h2>
						{posts.length !== 0 ? post.title:undefined}
					</h2>

					<p>
						{posts.length !== 0 ? post.content : undefined}
					</p>

					<Link
						to={`/newsdetail/${
							posts.length !== 0 ? post._id:undefined
						}`}
					>
						<span className="news-btn">Read More</span>
					</Link>
				</div>
				<img
						className="news-img"
						src={posts.length !== 0 ? post.mediaId.url:undefined}
						alt={post.mediaId.alt}
					/>
			</div>
			<div
			style={{
				height: 30,
				backgroundColor: '#f2f2f2',
			}}
		></div>
		</div>
		

		
		)}
			
			
			
				
			</div>
		</div>
	);
};

export default NewsHomePage;
