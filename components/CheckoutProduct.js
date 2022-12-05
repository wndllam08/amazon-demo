import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

const CheckoutProduct = ({
  id, 
  title, 
  price, 
  rating, 
  description, 
  category, 
  image, 
  hasPrime}) => {
  
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    // Push Items to redux
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    // Remove Items from redux
      dispatch(removeFromBasket({ id }));
    };
    
  return (
    <div className='grid grid-cols-5'>
      <div className='flex justify-center items-center'>
      <img src={image} alt="products" className='w-[180px] h-[180px] object-contain' />
      </div>
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={ i} height={20} width={20} className='text-yellow-500 h-5'/>
          ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="hasPrime" />
            <p className='text-xs text-gray-500'>FREE Next-day Deliver</p>
          </div>
        )}
      </div>
      
      {/* Right add/remove buttons */}
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='mt-auto button' onClick={addItemToBasket}>Add to Basket</button>
        <button className='mt-auto button' onClick={removeItemFromBasket}>Remove to Basket</button>
      </div>

    </div>
  )
}

export default CheckoutProduct