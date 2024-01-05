import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const MySlider = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 3500,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    const data = [1,2,3,4,5,6,7,8,9]
    return (
        <div>
            <Slider {...settings}>
            <div>
            <img className='w-full' src="https://i.ibb.co/PDhG8nh/Fitness-Desktop.webp" alt="Shoes" />
        </div>
            <div>
            <img className='w-full' src="https://i.ibb.co/dKmLMgz/Laptops-Desktop.webp" alt="Shoes" />
        </div>
            <div>
            <img className='w-full' src="https://i.ibb.co/y0kxWcS/Gaming-Desktop.webp" alt="Shoes" />
        </div>
            <div>
            <img className='w-full' src="https://i.ibb.co/ZHKB7GD/Earpods-Desktop.webp" alt="Shoes" />
        </div>
            <div>
            <img className='w-full' src="https://i.ibb.co/1Mtw50h/i-Pad-Desktop.webp" alt="Shoes" />
        </div>
            <div>
            <img className='w-full' src="https://i.ibb.co/8Ydt681/Smartphones-Desktop.webp" alt="Shoes" />
        </div>
            </Slider>
        </div>
    );
};

export default MySlider;