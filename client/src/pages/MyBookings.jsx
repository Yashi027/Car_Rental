import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const MyBookings = () => {
  const { user, navigate } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/booking/user');

      console.log(data);

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-8 sm:pt-12 pb-16 sm:pb-20">

      <div className="max-w-7xl mx-auto">

        <Title
          title="My Bookings"
          subTitle="View and manage all your car bookings"
          align="left"
        />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-gray-800">
              {bookings.length}
            </span>{' '}
            {bookings.length === 1 ? 'booking' : 'bookings'}
          </p>
        </div>

        <div className="mt-5 space-y-6">

          {bookings.length > 0 ? (

            bookings.map((booking, index) => (

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                key={booking._id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >

                <div className="grid grid-cols-1 md:grid-cols-12">

                  <div className="md:col-span-4 relative bg-gray-100 h-56 sm:h-64 md:h-full md:min-h-[300px] overflow-hidden">

                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 backdrop-blur-sm rounded-full shadow-sm text-gray-700">
                        Booking #{index + 1}
                      </span>
                    </div>

                  </div>

                  <div className="md:col-span-8 lg:col-span-5 p-5 sm:p-6 lg:p-8">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div className="min-w-0">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 break-words">
                          {booking.car.brand} {booking.car.model}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {booking.car.year} • {booking.car.category}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize shrink-0 ${booking.status === 'confirmed'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : 'bg-red-50 text-red-600 border border-red-100'
                          }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                    <div className="border-t border-gray-100 my-5"></div>

                    <div className="flex items-start gap-3 sm:gap-4">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <img
                          src={assets.calendar_icon_colored}
                          alt=""
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                          Rental Period
                        </p>

                        <p className="text-sm font-medium text-gray-800 mt-1 break-words">
                          {booking.pickupDate?.split('T')[0]}
                          <span className="mx-2 text-gray-400">→</span>
                          {booking.returnDate?.split('T')[0]}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 mt-5">

                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                        <img
                          src={assets.location_icon_colored}
                          alt=""
                          className="w-5 h-5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                          Pick-up Location
                        </p>

                        <p className="text-sm font-medium text-gray-800 mt-1 break-words">
                          {booking.car.location}
                        </p>
                      </div>

                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-100 lg:hidden">

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                            Total Amount
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Booked on {booking.createdAt?.split('T')[0]}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-1 shrink-0">
                          <span className="text-sm text-gray-500">₹</span>

                          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                            {booking.price}
                          </h1>
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="hidden lg:flex lg:col-span-3 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 lg:p-8 flex-col justify-center">

                    <div className="text-right">

                      <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                        Total Amount
                      </p>

                      <div className="flex items-baseline justify-end gap-1 mt-1">

                        <span className="text-sm text-gray-500">₹</span>

                        <h1 className="text-3xl font-bold text-primary break-all">
                          {booking.price}
                        </h1>

                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        Booked on {booking.createdAt?.split('T')[0]}
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))

          ) : (

            <div className="bg-white border border-gray-200 rounded-2xl py-16 px-5 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">

                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className="w-7 h-7 opacity-60"
                />

              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-5">
                No bookings yet
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                You haven't made any car bookings yet.
              </p>

              <button onClick={() => navigate('/cars')} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
                Browse Cars
              </button>

            </div>

          )}

        </div>

      </div>

    </motion.div>
  );
};

export default MyBookings;