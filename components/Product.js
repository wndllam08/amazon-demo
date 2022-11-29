import React from 'react';
import { useState, useEffect } from 'react'; 
import { StarIcon } from '@heroicons/react/24/solid';
import { NumericFormat } from 'react-number-format';




const Product = ({id, title, price, description, category, image}) => {
    const [rated, setRated] = useState();
    const val = Math.floor(((Math.random() * (5 - 1)) + 1) % 5);
    useEffect(() => setRated(val),[]);

    const [hasPrime, sethasPrime] = useState();
    const prime = Math.random() < 0.5;
    useEffect(() => sethasPrime(prime),[]);


  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg rounded-sm'>
      
        <p className='absolute top-2 right-2 font-poppins text-black-400 text-xs italic text-gray-400'>{category}</p>
      
      <div className='flex justify-center'>
        <img src={image} alt="products" className='w-[200px] h-[200px] object-contain' />
      </div>
        <h4 className='font-poppins font-semibold my-3'>{title}</h4>

        <div className='flex'>
          {Array(rated)
          .fill()
          .map((_, i) => (
            <StarIcon key={ i} height={20} width={20} className='text-yellow-500 h-5'/>
          ))}
        </div>

        <p className='text-xs my-2 line-clamp-2' >{description}</p>

        <div>
        <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>

       {hasPrime &&(
        <div className='flex items-center space-x-2'>
        <img className='w-12' src="https://links.papareact.com/fdw" alt="hasPrime" />
        <p className='text-xs text-gray-500'>Free Nex-day Delivery!</p>
        </div>
        )}

        <button className='mt-auto button'>Add to Basket</button>
    </div>
  
  )
};

export default Product;