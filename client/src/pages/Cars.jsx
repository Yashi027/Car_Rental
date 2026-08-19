import React, { useState } from 'react';
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from '../components/CarCard';

const Cars = () => {

  const [input, setInput] = useState();

  return (
    <div>

      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure' />

        <div className='flex items-center bg-white px-5 mt-8 max-w-140 w-full h-12 rounded-full shadow-sm border border-gray-100'>

          <img src={assets.search_icon} alt="Search" className='w-4 h-4 mr-3 opacity-60' />
          <input
            type="text"
            placeholder='Search by make, model or features'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 h-full outline-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400" />

          <img src={assets.filter_icon} alt="Filter" className='w-4 h-4 mr-3 opacity-60' />

        </div>

      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>

        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {dummyCarData.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {dummyCarData.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Cars;
