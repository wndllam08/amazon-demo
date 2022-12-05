import React from 'react';
import { useState, useEffect } from 'react'; 
import { StarIcon } from '@heroicons/react/24/solid';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import Image from 'next/legacy/image';


const maxRating = 5;
const minRating = 1;


const Product = ({id, title, price, description, category, image}) => {
    const [rating, setRated] = useState(0);
    useEffect(() => setRated(Math.floor(((Math.random() * (maxRating - minRating)) + minRating))));

    const [hasPrime, sethasPrime] = useState(0);
    useEffect(() => sethasPrime(Math.random() < 0.5));

    
    const dispatch = useDispatch();
    const addItemToBasket = () =>{
      const product = {id, 
        title, 
        price, 
        rating, 
        description, 
        category, 
        image, 
        hasPrime};
      dispatch(addToBasket(product))
    };

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg rounded-sm '>
      
        <p className='absolute top-2 right-2 font-poppins text-black-400 text-xs italic text-gray-400'>{category}</p>
      
      <div className='flex justify-center'>
        <Image src={image} alt="products" width={200} height={200} className='object-contain'/>
        
      </div>
        <h4 className='font-poppins font-semibold my-3'>{title}</h4>

        <div className='flex'>
          {Array(rating)
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

        <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
    </div>
  
  )
};

export default Product;