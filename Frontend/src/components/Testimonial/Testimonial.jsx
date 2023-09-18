import React from "react";
import Slider from "react-slick";
import av1 from '../../assets/images/ava-1.jpg'
import av2 from '../../assets/images/ava-2.jpg'
import av3 from '../../assets/images/ava-3.jpg'
import av4 from '../../assets/images/ava-4.jpeg'

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed:1000,
    swipeToSlide:true,
    autoplaySpeed:2000,
    slidesToShow:3,
    responsive :[
        {
        breakpoint : 992,
        settings : {
            slidesToShow:2,
            slidesToScroll:1,
            infinite : true,
            dots:true
        },
    },
    {
        breakpoint : 576,
        settings : {
            slidesToShow:1,
            slidesToScroll:1,
        },
    },
        
    ]
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={av1} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">John</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={av3} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Ronan</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={av2} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Adelita</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={av4} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Devin</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      
    </Slider>
  );
};

export default Testimonial;
