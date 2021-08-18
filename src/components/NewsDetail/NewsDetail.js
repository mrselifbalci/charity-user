import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

import './NewsDetail.css';

export default function NewsDetail() {
	const API_BASE_URL = 'https://charity-backend-july.herokuapp.com';

	// ClassicEditor.create(document.querySelector('#editor'), {
	// 	plugins: [SimpleUploadAdapter],
	// 	simpleUpload: {
	// 		// The URL that the images are uploaded to.
	// 		uploadUrl: `${API_BASE_URL}/medias`,

	// 		// Enable the XMLHttpRequest.withCredentials property.
	// 		withCredentials: true,

	// 		// Headers sent along with the XMLHttpRequest to the upload server.
	// 		headers: {
	// 			'X-CSRF-TOKEN': 'CSRF-Token',
	// 			Authorization: 'Bearer <JSON Web Token>',
	// 		},
	// 	},
	// })
	// 	.then((res) => console.log(res))
	// 	.catch((err) => console.log(err));

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { id } = useParams();
	const [addData, setAddData] = useState('');
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

	// const handleChange = (e, editor) => {
	// 	const data = editor.getData();
	// 	setAddData(data);
	// };

	// const handleSubmit = async () => {
	// 	await axios.put(`${API_BASE_URL}/news/${id}`, {
	// 		content: addData,
	// 	});
	// 	window.location.reload();
	// };

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
			{/* <div
				className='news-details-news-content-container'
				dangerouslySetInnerHTML={{ __html: news.content }}></div>
			<div className='CK-Editor'>
				<CKEditor
					editor={ClassicEditor}
					data={addData}
					onChange={handleChange}
					style={{ height: '300px' }}
				/>
			</div>
			<button type='submit' onClick={handleSubmit}>
				Add Content
			</button> */}
		</div>
	);
}
