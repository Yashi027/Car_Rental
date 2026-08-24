import React, { useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const Dashboard = () => {

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored }
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="px-4 pt-8 pb-10 md:px-10 flex-1 bg-gray-50 min-h-screen">

      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300">

            <div className="space-y-1">
              <h1 className="text-sm font-medium text-gray-500">{card.title}</h1>
              <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
            </div>

            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <img src={card.icon} alt={card.title} className="h-6 w-6 object-contain" />
            </div>

          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Recent Bookings</h1>
            <p className="text-sm text-gray-500 mt-1">Latest customer bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {data.recentBookings.map((booking, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200">

                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <img src={assets.listIconColored} alt="" className="h-5 w-5 object-contain" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{booking.car.brand} {booking.car.model}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <p className="text-sm font-semibold text-gray-800">Rs.{booking.price}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-50 text-green-600' : booking.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                    {booking.status}
                  </span>
                </div>

              </div>
            ))}

            {data.recentBookings.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-gray-500">
                No recent bookings found.
              </div>
            )}
          </div>

        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit">

          <div>
            <h1 className="text-lg font-semibold text-gray-800">Monthly Revenue</h1>
            <p className="text-sm text-gray-500 mt-1">Revenue for current month</p>
          </div>

          <div className="mt-8 p-5 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">Rs.{data.monthlyRevenue}</p>
            <p className="text-xs text-green-600 font-medium mt-3">Current Month</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;