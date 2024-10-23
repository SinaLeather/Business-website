import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const Testimonial = () => {
  return (
    <>
    <header>
  <div
    class="relative h-[350px] overflow-hidden bg-[url('https://tecdn.b-cdn.net/img/new/slides/041.webp')] bg-cover bg-[50%] bg-no-repeat">
    <div
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
      <div class="flex h-full items-center justify-center">
        <div class="px-6 text-center text-white md:px-12">
          <h1 class="mb-6 text-5xl font-bold">Sina Leather</h1>
          <h3 class="mb-8 text-3xl font-bold">Crafted with care, built to last leather that tells your story.</h3>
          <button
          type="button"
          class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          onclick="window.location.href='tel:+251911407749'">
          Call to action
           </button>
        </div>
      </div>
    </div>
  </div>
</header>
<div class="flex items-center justify-center">
    <p class="text-6xl text-gray-900 my-5">Gallery</p>
</div>

<div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
    <div class="-m-1 flex flex-wrap md:-m-2">
        <div class="flex w-1/2 flex-wrap">
            <div class="w-1/2 p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://cdn01.pinkoi.com/product/zkRWCuo8/2/640x530.jpg" />
            </div>
            <div class="w-1/2 p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://zqqzpfxqiwfbsfvfuqcu.supabase.co/storage/v1/object/public/images/photo_2024-06-28_19-25-19-transformed.jpeg" />
            </div>
            <div class="w-full p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://www.thefoxesden.co.nz/cdn/shop/products/bagformenOnlineNZ.jpg?v=1657494870" />
            </div>
        </div>
        <div class="flex w-1/2 flex-wrap">
            <div class="w-full p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://i.pinimg.com/736x/e8/c8/e1/e8c8e1976d1ad76f0d5940b0d58d8497.jpg" />
            </div>
            <div class="w-1/2 p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://zqqzpfxqiwfbsfvfuqcu.supabase.co/storage/v1/object/public/images/photo_2024-06-28_19-25-21-transformed.jpeg" />
            </div>
            <div class="w-1/2 p-1 md:p-2">
                <img
                    alt="gallery"
                    class="block h-full w-full rounded-lg object-cover object-center"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75ljRyWXkyoRgVG_yMMa1hwZXdNDIhEg_unYCkXsjKtO51rPKDAFTRFAs49UIG0oUL-E&usqp=CAU" />
            </div>
        </div>
    </div>
</div>

<footer class="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-gray-500 dark:text-white"> 
  <div className="  items-center  p-2 ">
            <div className="flex space-x-4 mx-5 items-center flex justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-x hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTelegram} className="text-white text-x hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} className="text-white text-x hover:text-pink-500" />
            </a>
      </div>
      </div>

  <div class="w-full dark:bg-gray-900  p-4 text-center">
    © 2025 Copyright:
    <a href="#">Sina Leather</a>
  </div>
</footer>

</>
      );
};

export default Testimonial;
