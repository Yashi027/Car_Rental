import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';

const testimonials = [
    {
        id: 1,
        name: 'Arundhati Roy',
        role: 'Business Traveler',
        image: assets.testimonial_image_1,
        rating: 5,
        review:
            'The car was clean, comfortable, and exactly as described. The booking process was incredibly simple and the service was excellent.',
    },
    {
        id: 2,
        name: 'Priya Mehta',
        role: 'Frequent Traveler',
        image: assets.testimonial_image_2,
        rating: 5,
        review:
            'I had a wonderful experience renting a car here. The vehicle was in perfect condition and the pickup process was quick and hassle-free.',
    },
    {
        id: 3,
        name: 'Arjun Kapoor',
        role: 'Weekend Traveler',
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 4,
        review:
            'Great selection of cars and very reasonable prices. The customer support team was also very helpful throughout my trip.',
    },
];

const Testimonial = () => {
    return (
        <section className="w-full bg-gray-50 py-20 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32">

            <div className="max-w-3xl mx-auto text-center mb-14">
                <Title
                    title="What Our Customers Say"
                    subTitle="Thousands of travelers trust us for comfortable, reliable, and hassle-free car rentals."
                />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-7 border border-gray-100
                       shadow-sm hover:shadow-lg
                       transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {testimonial.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-1 mt-5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span
                                    key={index}
                                    className={
                                        index < testimonial.rating
                                            ? 'text-yellow-400 text-lg'
                                            : 'text-gray-300 text-lg'
                                    }
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm leading-6 mt-4">
                            "{testimonial.review}"
                        </p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Testimonial;