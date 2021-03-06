import React, { useState, useEffect } from 'react';
import Donate from '../Donate/Donate';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from '../Auth/Login';
import Footer from '../Footer/Footer';
import Terms from '../StaticPages/Terms';
import Header from '../Header/Header';
import NewsHomePage from '../News-HomePage/NewsHomePage';
import SignUp from '../Auth/SignUp';
import News from '../News/News';
import NewsDetail from '../NewsDetail/NewsDetail';
import GetInvolved from '../GetInvolved/GetInvolved';
import DonateGoods from '../GetInvolved/DonateGoods/DonateGoods';
import GiftCard from '../GetInvolved/DonateGiftCard/GiftCard';
import DonateGoodsForm from '../GetInvolved/DonateGoods/DonateGoodsForm';
import Ambassador from '../GetInvolved/BeAnAmbassador/Ambassador';
import AmbassadorForm from '../GetInvolved/BeAnAmbassador/AmbassadorForm';
import DonateYourTime from '../GetInvolved/DonateYourTime/DonateYourTime';
import DonateYourTimeForm from '../GetInvolved/DonateYourTime/DonateYourTimeForm';
import SearchResults from '../Header/SearchResults/SearchResults';
import ContactUs from '../ContactUs/ContactUs';

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		if (userInfo) {
			userInfo.id && setIsLoggedIn(true);
		}
	}, []);

	return (
		<div>
			<Router>
				<Header
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					searchFunc={setSearchResults}
				/>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<React.Fragment>
								<NewsHomePage />
							</React.Fragment>
						)}
					/>
					<Route
						exact
						path='/login'
						render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route exact path='/static/:param' render={() => <Terms />} />
					<Route
						exact
						path='/signup'
						render={() => (
							<SignUp
								setIsLoggedIn={setIsLoggedIn}
								isLoggedIn={isLoggedIn}
							/>
						)}
					/>
					<Route exact path='/donate' component={Donate} />
					<Route exact path='/campaigns&news' component={News} />
					<Route exact path='/newsdetail/:id' render={() => <NewsDetail />} />
					<Route
						exact
						path='/getinvolved'
						render={() => <GetInvolved isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/donate-goods'
						render={() => <DonateGoods isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/donategoods-form'
						render={() => <DonateGoodsForm isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/donate-your-time'
						render={() => <DonateYourTime isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/donateyourtime-form'
						render={() => <DonateYourTimeForm isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/donate-with-a-gift-card'
						render={() => <GiftCard isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/be-an-ambassador'
						render={() => <Ambassador isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/getinvolved/beanambassador-form'
						render={() => <AmbassadorForm isLoggedIn={isLoggedIn} />}
					/>
					<Route
						exact
						path='/search-results'
						render={() => <SearchResults searchResults={searchResults} />}
					/>

					<Route exact path='/contact-us' component={ContactUs} />
				</Switch>

				<Footer />
			</Router>
		</div>
	);
}
