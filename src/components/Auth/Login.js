import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './Login.css';
import GoogleLogin from 'react-google-login';
import googleLogo from './grommet-icons_google.jpg';
require('dotenv'); 

const Login = ({ setIsLoggedIn }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ userExist, setUserExist ] = useState(false);

	const history = useHistory();

	const responseGoogle = (response) => {
		if (!response.googleId)
			return (document.querySelector('.valid').textContent =
				'Something went wrong try again or sign in manually');
		const { email, googleId } = response.profileObj;
		axios
			.post('https://charity-backend-july.herokuapp.com/users/signin', {
				email: email,
				password: googleId
			})
			.then((res) => {
				sessionStorage.setItem('userInfo', JSON.stringify(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
		window.scroll(0, 0);
		document.querySelector('.valid').textContent = 'Signed up successfully. Redirecting to homepage...';
		setTimeout(() => {
			setIsLoggedIn(true);
			history.push('/');
		}, 1500);
	}; 

	const login = (e) => {
		if (email.trim() === '' || password.trim() === '') {
			document.querySelector('.valid').textContent = 'Please fill the blanks!';
			return false;
		}
		const username = email.includes('@')
			? {
					email: email,
					password: password
				}
			: {
					username: email,
					password: password
				};
		axios
			.post('http://localhost:5001/users/signin', username)
			.then((res) => {
				setUserExist(true);
				setIsLoggedIn(true);
				sessionStorage.setItem('userInfo', JSON.stringify(res.data));

				console.log(res.data);
			})
			.catch((err) => {
				setUserExist(false);
				document.querySelector('.valid').textContent = 'Invalid email or password!';
				console.log(err);
			});
	};

	if (userExist) {
		return <Redirect to="/" />;
	}

	return (
		<div className="sign-in">
			<div className="sign-in-body">
				<h1 className="sign-in-SignIn">Sign in</h1>
				<h3 className="valid" style={{ color: 'red' }}>
					{' '}
				</h3>
				<form className="sign-in-form">
					<label style={{ color: '#347ca5' }} htmlFor="email">
						Email or Username
					</label>
					<input
						className="sign-in-email"
						type="text"
						id="email"
						name="email"
						placeholder="Enter your email or username"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label style={{ color: '#347ca5' }} htmlFor="password">
						Password
					</label>
					<input
						className="sign-in-password"
						type="password"
						id="password"
						name="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Link onClick={login} className="link" to={userExist ? '/' : '/login'}>
						Sign in
					</Link>
					<GoogleLogin
						render={(renderProps) => (
							<button
								className="sign-up-google"
								type="button"
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
							>
								<img src={googleLogo} alt="google logo" /> Sign in with Google
							</button>
						)}
						className="sign-up-google"
						clientId="906847324262-l8eosmhanc5hq8015f5sq2dle6r6hh62.apps.googleusercontent.com"
						buttonText="Join with Google"
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				</form>
				<div className="sign-in-signUp">
					<p>
						New to Helping Hands? <a href="/signup">Join Now</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
