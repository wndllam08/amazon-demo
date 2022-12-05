import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { CheckoutProduct, Header } from '../components'
import { selectItems, selectTotal } from '../slices/basketSlice'
import { NumericFormat } from 'react-number-format';
import { useSession } from 'next-auth/react'

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
console.log(session);
  return (
    <div className='bg-gray-100'>
        <Header />
        <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* Left */}
            <div className='flex-grow m-5 shadow-sm'>
                <Image
                src="https://links.papareact.com/ikj"
                width={1020}
                height={250}
                className='object-contain cursor-pointer'
                />

                <div className='flex flex-col p-5 space-y-10 bg-white'>
                    <h1 className='font-poppins text-3xl border-b pb-4'>
                      {items.length === 0 ? 'Your Basket is empty!' : 'Your Shopping Basket'}
                    </h1>

                    {items.map((item, i) => (
                      <CheckoutProduct 
                      key={i}
                      id={item.id}
                      title={item.title}
                      rating={item.rating}
                      price={item.price}
                      description={item.description}
                      category={item.category}
                      image={item.image}
                      hasPrime={item.hasPrime}
                      />
                    ))}
                </div>

            </div>

            {/* Right */}
            <div className='flex flex-col bg-white p-10 shadow-md'>
              {items.length > 0 && (
                <>
                  <h2 className='whitespace-nowrap'>
                    Subtotal ({items.length} items):
                    <span className='font-bold'>
                      <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </span>
                  </h2>
                  <button 
                    disabled={!session}
                    className={`button mt-2 ${
                      !session && 
                      'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'} `}>
                      {!session ? 'Sign in to Checkout' : 'Proceed to checkout'}
                  </button>
                </>
              )}
            </div>
        </main>
    </div>
  )
}

export default Checkout