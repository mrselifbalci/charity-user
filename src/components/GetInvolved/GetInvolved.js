import React, {useEffect,useState} from 'react';
import axios from 'axios';
import './GetInvolved.css';
import { Link, useHistory } from 'react-router-dom';
import GetInvolvedCard from './GetInvolvedCard';

const GetInvolved = ({isLoggedIn}) => {
   const[slider,setSlider]=useState([])
   const[url,setUrl]=useState('')
   const[getInvolved,setGetInvolved]=useState([])
  

    const history = useHistory()
    const alertFunc = () => {
        if(isLoggedIn) {
            history.push("/getinvolved/donate-with-gift-card")
        } else {
            alert('Please login first.')
            history.push('/login')
        } 
    }
    useEffect(() => {
		window.scroll(0, 0);
        axios.get('https://charity-backend-july.herokuapp.com/slider/type/involve')
        .then((res) => {
            setSlider(res.data.data[0])
            setUrl(res.data.data[0].mediaId.url)
        }).catch((err) => console.log(err));
   

        axios.get('https://charity-backend-july.herokuapp.com/getinvolved')
        .then((res) => {
            setGetInvolved(res.data.response)
        }).catch((err) => console.log(err));
        console.log()
	}, []);
    return (
        <div className="getInvolved"> 
          <div className="getInvolved_img" style={{backgroundImage: `url('${url}')`}}></div>     
          <div className="getInvolved_text"> 
                <p style={{marginLeft:"30px"}}>{slider.quote}</p>
          </div> 
          <div className="getInvolved_title">
                <p style={{marginLeft:"30px"}}>{slider.title}</p>
          </div>
            <div className="getInvolved_images"> 
                {getInvolved.map(item=>{
                   return <GetInvolvedCard item={item} url={item.mediaId.url} key={item._id}/>
                })}
            </div>

        </div>
    )
}

export default GetInvolved
