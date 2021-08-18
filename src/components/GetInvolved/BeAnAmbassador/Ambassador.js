
import React, {useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import imageHeader from '../DonateGoods/Rectangle 26.png';


// import imageHeader from '../DonateGoods/Rectangle 26.png';

import "./Ambassador.css";
import "./AmbassadorForm.css"
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Ambassador = ({isLoggedIn}) => {

  const history = useHistory()


  function handleClick () {
    if(isLoggedIn) {
      history.push("/getinvolved/beanambassador-form") }
      else {
history.push("/login")
      }
    }
  

    const [title, setTitle] = useState("");
    const [image, setImage] = useState();
    const [ambassador , setAmbassador ] = useState([]);
  
    useEffect(() => {
      axios
        .get('https://charity-backend-july.herokuapp.com/getinvolved')
        .then((res) => setAmbassador(res.data.response[0]))
        .catch((err) => console.log(err));
  
      axios
      .get('https://charity-backend-july.herokuapp.com/slider/type/ambassador')
      .then((res) => {
        setTitle(res.data.data[0]);
        setImage(res.data.data[0].mediaId.url);
  
        console.log(ambassador);
      })
      .catch((err) => console.log(err));	
    }, [image]);
   
  console.log(title.title);
  useEffect(() => {
		window.scroll(0, 0);
	}, []);
  return (
    <div className ="mainContainerambass">
      <div className="ambassadorForm-container">
				<img src={image} alt="Avatar" className="ambassadorForm-image" />
				<div className="ambassadorForm-overlay">
					<h1 className="ambassadorForm-text" id="h1-content">{title.title}</h1>
				</div>
			</div>
      <div className="contentAmb">

  
        {ambassador.content}
      

       
					<button
						onClick={handleClick}
						className="apply-btn-Amb"
					>
					{ambassador.buttonText}
					</button>

      </div>
      
    </div>
  )
}

export default Ambassador;