import React from 'react'
import { Link} from 'react-router-dom';

export default function GetInvolvedCard({item,url}) {
    return (
        <div>
           <div className="getInvolved_image">
                    <Link to={`/getinvolved/${item.title.split(' ').join('-').toLowerCase()}`} className="getInvolved_image_img" style={{backgroundImage: `url('${url}')`}}>
                        <span className="donate_good">{item.title}</span>
                    </Link>
            </div>
        </div>
    )
}
