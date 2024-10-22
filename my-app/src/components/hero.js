import React from 'react';
import { Link } from 'react-router-dom';


const HeroSecition = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">For All Seasons</span>{' '}
                <span className="block text-green-300 xl:inline">Any Circumstances</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Be online always and everywhere
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">

              <Link to="/product">
                <button
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
                >
                  Products
                </button>
              </Link>


                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
                onClick={() => window.location.href = "https://www.example.com"}
              >
                About us
              </button>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://zqqzpfxqiwfbsfvfuqcu.supabase.co/storage/v1/object/sign/images/Untitled%20design%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvVW50aXRsZWQgZGVzaWduICgxKS5wbmciLCJpYXQiOjE3Mjk2MjA0NzUsImV4cCI6MjA0NDk4MDQ3NX0.BFEUDOs_jUuodDTfgOFO1aozEjqQ7R83JPWJvRR7ggk"
          alt="Smartwatch promo"
        />
      </div>
    </div>
  );
};

export default HeroSecition;
