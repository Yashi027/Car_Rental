import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';

const AddCar = () => {
  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 2,
    location: '',
    description: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setCar((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log('Car Details:', car);
    console.log('Car Image:', image);
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 px-4 py-8 md:px-10 lg:px-12">

      <div className="mb-8">
        <Title
          title="Add New Car"
          subTitle="Fill in the details to list a new car for booking, including price, availability and specifications."
        />
      </div>

      <div className="max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 md:p-8">

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-7 text-gray-600 text-sm"
        >

          <div>
            <label className="block font-medium text-gray-700 mb-3">
              Car Image
            </label>

            <div className="flex items-center gap-5">

              <label
                htmlFor="car-image"
                className="group cursor-pointer"
              >
                <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary transition-all duration-200 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:bg-gray-100">

                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : assets.upload_icon
                    }
                    alt="Car"
                    className={
                      image
                        ? "w-full h-full object-cover"
                        : "w-10 h-10 opacity-60"
                    }
                  />

                </div>

                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <div>
                <p className="font-medium text-gray-700">
                  Upload car image
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG or WEBP
                </p>

                <p className="text-xs text-gray-400">
                  Recommended size: 800 × 600px
                </p>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Basic Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={car.brand}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. BMW, Mercedes, Audi"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={car.model}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. X5, E-Class, M4"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={car.year}
                  onChange={onChangeHandler}
                  min="1900"
                  max="2030"
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. 2026"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Daily Price (Rs.)
                </label>

                <input
                  type="number"
                  name="pricePerDay"
                  value={car.pricePerDay}
                  onChange={onChangeHandler}
                  min="0"
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. 2500"
                  required
                />
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Car Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Category
                </label>

                <select
                  name="category"
                  value={car.category}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Van">Van</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Transmission
                </label>

                <select
                  name="transmission"
                  value={car.transmission}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                  required
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Fuel Type
                </label>

                <select
                  name="fuel_type"
                  value={car.fuel_type}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
                  required
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-600 mb-1.5">
                  Seating Capacity
                </label>

                <input
                  type="number"
                  name="seating_capacity"
                  value={car.seating_capacity}
                  min={1}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. 2,4,7"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="font-medium text-gray-600 mb-1.5">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={car.location}
                  onChange={onChangeHandler}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="e.g. Delhi, Noida, Ghaziabad"
                  required
                />
              </div>

            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1.5">
              Description
            </label>

            <textarea
              name="description"
              value={car.description}
              onChange={onChangeHandler}
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Write a short description about the car..."
              required
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">

            <button
              type="button"
              onClick={() => {
                setImage(null);

                setCar({
                  brand: '',
                  model: '',
                  year: '',
                  pricePerDay: '',
                  category: '',
                  transmission: '',
                  fuel_type: '',
                  seating_capacity: '',
                  location: '',
                  description: ''
                });
              }}
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            >
              Clear
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Add Car
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCar;

