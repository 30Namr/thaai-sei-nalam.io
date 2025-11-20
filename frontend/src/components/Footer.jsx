import React from 'react'
import { assets } from '../assets/assets'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-32' />
                    <p className='w-full mid:w-2/3 text-gray-600'>Comfort & Joy for Every Journey
                    </p>
                    <p className='w-full mid:w-2/3 text-gray-600'>Curated newborn essentials and pregnancy-friendly apparel crafted from soft, breathable fabrics. Thoughtfully designed for the first days and beyond.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>

                        <li>+91 88987 22619</li>
                        <li>thaaiseinalam@gmail.com</li>

                        {/* Instagram */}
                        <li className="flex items-center gap-2 mt-2">
                            <a 
                                href="https://www.instagram.com/thaaiseinalam?igsh=YW5pMWpoaDhsZW01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-pink-600 transition-all"
                            >
                                <FaInstagram size={20} className="text-pink-600" />
                                Instagram
                            </a>
                        </li>

                        {/* WhatsApp */}
                        <li className="flex items-center gap-2">
                            <a 
                                href="https://api.whatsapp.com/send?phone=918898722619&text=Hi%20I%20want%20to%20know%20more%20details"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-green-600 transition-all"
                            >
                                <FaWhatsapp size={20} className="text-green-600" />
                                WhatsApp
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'> Copyright 2025@ forever.com - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
