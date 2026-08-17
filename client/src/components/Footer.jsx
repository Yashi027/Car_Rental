import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full bg-light border-t border-borderColor/50">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          <div className="md:col-span-5 lg:col-span-5">

            <div className="flex items-center mb-5">
              <img
                src={assets.logo}
                alt="Car Rental Logo"
                className="h-9 w-auto"
              />
            </div>

            <p className="text-sm text-gray-500 leading-7 max-w-md">
              Your trusted partner for comfortable, reliable, and
              hassle-free car rentals. From city drives to weekend
              getaways, we make every journey simple and enjoyable.
            </p>

            <div className="flex items-center gap-3 mt-7">

              <a
                href="#"
                className="group w-9 h-9 flex items-center justify-center
                           rounded-full bg-white
                           border border-borderColor
                           text-gray-500
                           hover:text-primary
                           hover:border-primary/40
                           hover:-translate-y-0.5
                           transition-all duration-300"
              >
                <span className="font-medium"><img src={assets.facebook_logo} alt="" /></span>
              </a>

              <a
                href="#"
                className="group w-9 h-9 flex items-center justify-center
                           rounded-full bg-white
                           border border-borderColor
                           text-gray-500
                           hover:text-primary
                           hover:border-primary/40
                           hover:-translate-y-0.5
                           transition-all duration-300"
              >
                <span className="text-sm"><img src={assets.twitter_logo} alt="" /></span>
              </a>

              <a
                href="#"
                className="group w-9 h-9 flex items-center justify-center
                           rounded-full bg-white
                           border border-borderColor
                           text-gray-500
                           hover:text-primary
                           hover:border-primary/40
                           hover:-translate-y-0.5
                           transition-all duration-300"
              >
                <span className="text-xs font-semibold"><img src={assets.instagram_logo} alt="" /></span>
              </a>

            </div>

          </div>


          <div className="md:col-span-2 lg:col-span-2">

            <h3 className="text-sm font-semibold text-gray-900 mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Our Cars
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Reviews
                </a>
              </li>

            </ul>

          </div>


          <div className="md:col-span-2 lg:col-span-2">

            <h3 className="text-sm font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-500">

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Browse Cars
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  My Bookings
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Offers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>

            </ul>

          </div>

          <div className="md:col-span-3 lg:col-span-3">

            <h3 className="text-sm font-semibold text-gray-900 mb-6">
              Contact & Support
            </h3>

            <ul className="space-y-5 text-sm text-gray-500">

              <li className="flex items-start gap-3">
                <span className="text-primary text-base mt-0.5">
                  📍
                </span>

                <span className="leading-6">
                  123 Drive Street,
                  <br />
                  New Delhi, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-primary text-base">
                  ✉
                </span>

                <a
                  href="mailto:support@carrental.com"
                  className="hover:text-primary transition-colors duration-200"
                >
                  support@carrental.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-primary text-base">
                  ☎
                </span>

                <a
                  href="tel:+911234567890"
                  className="hover:text-primary transition-colors duration-200"
                >
                  +91 12345 67890
                </a>
              </li>

            </ul>

          </div>

        </div>
      </div>

      <div className="border-t border-borderColor/60 bg-white">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">

          <div
            className="min-h-16 flex flex-col sm:flex-row
                       items-center justify-between gap-3
                       text-xs sm:text-sm text-gray-500"
          >

            <p>
              © {new Date().getFullYear()} Car Rental. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;