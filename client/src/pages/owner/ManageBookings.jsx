import React, { useEffect, useState } from 'react';
import Title from '../../components/owner/Title';
import { dummyMyBookingsData } from '../../assets/assets';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 pt-8 pb-10 md:px-8 lg:px-10">

      <div className="mb-7">
        <Title
          title="Manage Bookings"
          subTitle="Track all customer bookings, approve or cancel requests and manage booking statuses."
        />
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Car
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 max-md:hidden">
                  Date Range
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Total
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 max-md:hidden">
                  Payment
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="group border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">

                        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={booking.car.image}
                            alt={`${booking.car.brand} ${booking.car.model}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {booking.car.brand} {booking.car.model}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-5 py-4 max-md:hidden">
                      {booking.pickupDate.split('T')[0]}
                      <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        to
                      </span>
                      {booking.returnDate.split('T')[0]}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        ₹{booking.car.pricePerDay}
                      </p>
                      <p className="text-xs text-gray-400">
                        per day
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className='rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'>Offline</span>
                    </td>

                    <td className="px-5 py-4">
                      {booking.status === 'pending' ? (
                        <select value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                          {booking.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">

                      <h3 className="font-semibold text-gray-700">
                        No bookings
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        You haven't any bookings yet.
                      </p>

                    </div>
                  </td>
                </tr>

              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default ManageBookings;
