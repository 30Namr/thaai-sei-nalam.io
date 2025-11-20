import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { FaInstagram } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>          
          <p className='text-gray-500'> 106, Gingee Road, Opposite Big World, <br/>Tindivanam 604001, Tamil Nadu, India</p>
          <p className='text-gray-500'>Tel : (91) 88987 22619 <br/> Email : thaaiseinalam@gmail.com </p>
          {/* Instgram and whatsapp icon integration link correctly  start */}
         <p className="flex items-center gap-2 group cursor-pointer text-gray-700">
  <a 
    href="https://www.instagram.com/thaaiseinalam?igsh=YW5pMWpoaDhsZW01"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 hover:text-pink-600 transition-all"
  >
    <FaInstagram className="text-pink-600" size={22} />

    Instagram

    <FaArrowRight 
      className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300"
      size={16}
    />
  </a>
</p>
          {/* instagram*/}
          <p className="flex items-center gap-2 group cursor-pointer text-gray-700">
  <a 
    href="https://api.whatsapp.com/send?phone=918898722619&text=Hi%20I%20want%20to%20know%20more%20details"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 hover:text-green-600 transition-all"
  >
    <FaWhatsapp className="text-green-600" size={22} />
    WhatsApp
  </a>
</p>

          {/* Instgram and whatsapp icon integration link correctly  start */}
           <p className='text-gray-500'>Contact us for more details.</p>
          {/* <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all 
          duration-500'></button> */}
        </div>
      </div>
    </div>
  )
}

export default Contact
