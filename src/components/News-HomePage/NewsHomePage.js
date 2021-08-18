import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsHomePage.css';
import { Link } from 'react-router-dom';


const NewsHomePage = () => {
	const [posts, setPosts] = useState([]);
	const [image, setImage] = useState();
	const [slider, setSlider] = useState([]);

	useEffect(() => {
		axios
			.get('https://charity-backend-july.herokuapp.com/news?limit=3')
			.then((res) => setPosts(res.data.data))
			.catch((err) => console.log(err));

		axios
		.get('https://charity-backend-july.herokuapp.com/slider/type/news-home')
		.then((res) => {
			setSlider(res.data.data[0]);
			setImage(res.data.data[0].mediaId.url);

			console.log(slider);
		})
		.catch((err) => console.log(err));	
	}, [image]);
 

 

	return (
		<div>
			<div id="slider-box">
			<img id="slider-pic" src={image} alt="pic" />

			<div id="quote-text">
				<p className="quote-text">
					{slider.quote}
				</p>
				
				<p className="quote-person">{slider.quoteAuthor}</p>
			</div>
		</div>

			<div id="news-div">
			<span id="newsTitle">{slider.title}</span>
		

			<div id="newsHomePage">
				{posts.map((post,index)=> index %2 === 0 ? 	<div className="news">
				
					<img
						className="news-img"
						src={posts.length !== 0 ? post.mediaId.url : undefined}
						alt={ post.mediaId.alt}
					/>
		
			<div className="news-text">
				<h2>{posts.length !== 0 ? post.title : undefined}</h2>


				<p>{post.summary ? (post.summary).split(' ').slice(0,60).join(' ') : undefined} <strong>....</strong></p>


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
						{posts.length !== 0 ? (post.summary).split(' ').slice(0,60).join(' ') : undefined} <strong>....</strong>
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
		</div>
	);
};

export default NewsHomePage;
