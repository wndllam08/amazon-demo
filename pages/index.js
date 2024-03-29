import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Header,Banner,ProductFeed } from '../components';

export default function Home( {products} ) {
  return (
    <div className="scroll-smooth bg-gray-100">
    
      <Head>
        <title>Amazon Demo Clone</title>
      </Head>
        {/* HeadNav */}
      <Header/>

      <main className="max-w-screen-2xl mx-auto">

        {/* Banner */}
        <Banner/>
        {/* ProductFeed */}
        <ProductFeed products={products}/>

      </main>
   
    </div>
  )
}

// Needed when doing server side rendering
export async function getServerSideProps(context) {
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
    ); 

  return{ 
    props: {
      products,
      session,
    },
  };
}   
