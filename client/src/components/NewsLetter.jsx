import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="w-full px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20">
      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 sm:px-10 md:px-16">

          <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5" />

          <div className="absolute top-1/2 right-20 hidden md:block
                          h-32 w-32 -translate-y-1/2 rounded-full
                          border border-white/10" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">

            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5
                             text-xs font-medium tracking-wide text-white">
              STAY UPDATED
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight
                           text-white sm:text-4xl md:text-[42px]">
              Stay ahead with our latest offers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed
                          text-blue-100 sm:text-base">
              Subscribe to our newsletter and get exclusive rental deals,
              new vehicle updates, travel tips, and special offers directly
              in your inbox.
            </p>

            {!subscribed ? (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-xl flex-col gap-3
                           sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="h-12 flex-1 rounded-lg border border-transparent
                             bg-white px-5 text-sm text-gray-700
                             outline-none placeholder:text-gray-400
                             focus:border-white focus:ring-2
                             focus:ring-white/30"
                />

                <button
                  type="submit"
                  className="h-12 rounded-lg bg-white px-7
                             text-sm font-medium text-primary
                             shadow-sm transition-all duration-300
                             hover:bg-gray-100 hover:shadow-md
                             cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="mx-auto mt-8 max-w-xl rounded-lg
                              border border-white/20 bg-white/10
                              px-5 py-4">
                <p className="font-medium text-white">
                  ✓ Thanks for subscribing!
                </p>

                <p className="mt-1 text-xs text-blue-100">
                  You'll receive our latest offers and updates.
                </p>
              </div>
            )}

            <p className="mt-4 text-xs text-blue-100/80">
              No spam. Unsubscribe anytime.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;