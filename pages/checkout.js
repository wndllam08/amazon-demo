import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { CheckoutProduct, Header } from '../components';
import { selectItems, selectTotal } from '../slices/basketSlice';
import { NumericFormat } from 'react-number-format';
import { getSession, useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session
    const checkoutSession = await axios.post('/api/create-checkout-session', 
    {
      items: items,
      email: session.user.email
    });

    //Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if(result.error) alert(result.error.message);
    
    
  };

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
                    role="link"
                    onClick={createCheckoutSession}
                    disabled={!session}
                    className={`button mt-2 ${
                      !session && 
                      'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'} `}>
                      {!session ? 'Sign in to Checkout' : 'Proceed to checkout'}
                  </button>
                  <p className='font-poppins text-xs text-gray-500'>This is a DEMO! use this card details for Checkout<br/> 
                  Card#: 4242 4242 4242 4242 <br/> 
                  Exp: 04/24 <br />
                  CVC: 4242
                  </p>
                </>
              )}
            </div>
        </main>
    </div>
  )
}

export default Checkout

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return{
      props: {
          session,
      },
  };
} 