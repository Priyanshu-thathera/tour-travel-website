import React from 'react'
import "./service-card.css"
const ServiceCard = ({item}) => {
  
  const {imgUrl , title ,description} = item;

    return (
    <div className='service_item'>
        <div className='service_img'>
        <img src={imgUrl} alt=''/>
        </div>
        <h5>{title}</h5>
        <p>{description}</p>
    </div>
  )
}

export default ServiceCard