import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Cars = () => {

  const [input, setInput] = useState('');
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([])

  const applyFilters = async () => {
    if (input.trim() === '') {
      setFilteredCars(cars)
      return null;
    }

    const filtered = cars.filter((car) => {
      return car.brand?.toLowerCase().includes(input.toLowerCase())
        || car.model?.toLowerCase().includes(input.toLowerCase())
        || car.category?.toLowerCase().includes(input.toLowerCase())
        || car.transmission?.toLowerCase().includes(input.toLowerCase())
        || car.location?.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/booking/check-availability', { location: pickupLocation, pickupDate, returnDate })
      if (data.success) {
        setFilteredCars(data.availableCars)
        if (data.availableCars.length === 0)
          toast("No cars Available")
        return null;
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability()
    } else {
      setFilteredCars(cars)
    }
  }, [isSearchData, cars])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilters()
  }, [input, cars])

  return (
    <div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-5 mt-8 max-w-140 w-full h-12 rounded-full shadow-sm border border-gray-100'>

          <img src={assets.search_icon} alt="Search" className='w-4 h-4 mr-3 opacity-60' />
          <input
            type="text"
            placeholder='Search by make, model or features'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 h-full outline-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400" />

          <img src={assets.filter_icon} alt="Filter" className='w-4 h-4 mr-3 opacity-60' />

        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>

        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (
            <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              key={index}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

      </motion.div>

    </div>
  );
}

export default Cars;
