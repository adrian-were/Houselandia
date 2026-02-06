import React from 'react';

import HouseBanner from '../assets/houselogo.jpg'
import Search from '../components/Search';
function Banner() {
  return (
    <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
          <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
            <span className='text-violet-700'>Rent</span>
             Nyumba Poa, Maisha Rahisi.
          </h1>
          <p className='max-w-[480px] mb-8'>
            Elevate your lifestyle with Nairobi’s most intuitive rental platform. We specialize in connecting professionals and families with high-quality bungalows, modern apartments, and executive mansions within the city’s premier zones.
            Karibu to a smarter way of finding your next prestigious address.
          </p>
        </div>
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <img src={HouseBanner} alt="modern home"/>
        </div>
      </div>
      <Search/>
    </section>
  )
};

export default Banner;


