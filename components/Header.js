import React from 'react';
import Image from 'next/image';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

  return (
    <header>
        
        {/* TopNav */}
        <div className='flex items-center bg-amazon_blue pl-5 flex-grow py-2 font-poppins'>
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0 mr-3'>
                <Image onClick={() => router.push("/")}
                src="https://links.papareact.com/f90"
                width={150}
                height={50}
                className='object-contain cursor-pointer'
                />
            </div>
        {/* Search */}
            <div className='hidden sm:flex items-center h-12 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-2 text-xl font-medium text-gray-800' type="text" />
                <MagnifyingGlassIcon className='h-14 p-4'/>
                
            </div>

            {/* Right */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div onClick={!session ? signIn : signOut} className="link">
                    <p>
                    {session ? `Hello ${session.user.name}`: "Sign In"}
                    </p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
                <div onClick={() => router.push("/orders")} className="link">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm">& Orders</p>
                </div>
                <div onClick={() => router.push("/checkout")} className="relative link flex items-center">
                    <span className="absolute top-0 right-0 md:right-12 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">
                        {items.length}
                    </span>
                    <ShoppingCartIcon className='h-10'/>
                    <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                </div>
            </div>
        </div>

        {/* BottomNav */}
        <div className='flex items-center space-x-3 p-2 pl-2 bg-amazon_blue-light text-white text-sm md:text-base md:pl-4'> 
            <p className='link flex items-center'>
                <Bars3Icon className='h-6 mr-1 font-semibold'/>
                All
            </p>
            <p className='link font-semibold'>Today's Deals</p>
            <p className='link font-semibold'>Gift Cards</p>
            <p className='link font-semibold'>Prime Video</p>
            <p className='link font-semibold'>Buy Again</p>
            <p className='link font-semibold'>Sell</p>
            <p className='link font-semibold hidden md:inline-flex'>Customer Service</p>
            <p className='link font-semibold hidden md:inline-flex'>Electornics</p>
            <p className='link font-semibold hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link font-semibold hidden lg:inline-flex'>Shopper Toolkit</p>
        </div>
    </header>
  )
}


export default Header