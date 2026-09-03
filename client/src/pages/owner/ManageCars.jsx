import React, { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 pt-8 pb-10 md:px-8 lg:px-10">

      <div className="mb-7">
        <Title
          title="Manage Cars"
          subTitle="View all listed cars, update their details, or remove them from the booking platform."
        />
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Your Cars
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {cars.length} {cars.length === 1 ? 'car' : 'cars'} listed
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
            Manage your listings
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Car
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 max-md:hidden">
                  Category
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 max-md:hidden">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {cars.length > 0 ? (
                cars.map((car, index) => (
                  <tr
                    key={index}
                    className="group border-t border-gray-100 transition-colors duration-200 hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">

                        <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {car.brand} {car.model}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {car.seating_capacity} Seats
                            <span className="mx-1">•</span>
                            {car.transmission}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-5 py-4 max-md:hidden">
                      <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        {car.category}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        ₹{car.pricePerDay}
                      </p>
                      <p className="text-xs text-gray-400">
                        per day
                      </p>
                    </td>

                    <td className="px-5 py-4 max-md:hidden">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                          car.isAvaliable
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            car.isAvaliable
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        ></span>

                        {car.isAvaliable
                          ? 'Available'
                          : 'Unavailable'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          title={
                            car.isAvaliable
                              ? 'Make unavailable'
                              : 'Make available'
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 active:scale-95"
                        >
                          <img
                            src={
                              car.isAvaliable
                                ? assets.eye_close_icon
                                : assets.eye_icon
                            }
                            alt="Availability"
                            className="h-6 w-6"
                          />
                        </button>

                        <button
                          type="button"
                          title="Delete car"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 transition-all duration-200 hover:bg-red-100 active:scale-95"
                        >
                          <img
                            src={assets.delete_icon}
                            alt="Delete"
                            className="h-6 w-6"
                          />
                        </button>

                      </div>
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

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-2xl">🚗</span>
                      </div>

                      <h3 className="font-semibold text-gray-700">
                        No cars listed
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        You haven't added any cars yet.
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
};

export default ManageCars;

