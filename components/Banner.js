import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className='relative'>
        <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>

   
        <Carousel 
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        >
            <div>
                <Image src="https://links.papareact.com/6ff" alt="amazonAds" width={414} height={165} className='object-contain'/>
            </div>


            <div>
                <Image src="https://links.papareact.com/7ma" alt="amazonAds" width={414} height={165} className='object-contain'/>
            </div>
        </Carousel>
    </div>
  )
}

export default Banner