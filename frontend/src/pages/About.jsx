import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">

          <p>Welcome to Forever, your one-stop destination for quality products at unbeatable prices.
            We are passionate about delivering the best shopping experience with a wide range of items,
            secure payments, and fast delivery</p>
          <p>To redefine online fashion by delivering stylish, high-quality clothing that empowers confidence and individuality</p>
          <b className="text-gray-800 ">Our Mission</b>
          <p>Our mission is simple: to deliver high-quality apparel at fair prices, without compromising on style.
            From everyday basics to statement outfits, every product is designed to suit your unique personality
            and lifestyle.</p>
        </div>

      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance : </b>
          <p className='text-gray-600'>At Forever, quality is at the heart of everything we do.
            Every piece of clothing is crafted with premium materials and undergoes strict quality checks to ensure durability, comfort, and style.
            From fabric selection to final stitching, we maintain the highest standards so you receive products that meet your expectations.
            Your satisfaction is our priority, and we stand behind the quality of every item we delive</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className='text-gray-600'>Shopping for your favorite styles has never been easier. At Forever, we offer a user-friendly website,
            secure payment options, and multiple delivery methods to make your experience seamless.
            From browsing to checkout, everything is designed to save you time and effort—so you can enjoy
            hassle-free shopping from the comfort of your home.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Services : </b>
          <p className='text-gray-600'>At Forever, we believe that great fashion deserves great service.
             Our dedicated support team is always ready to assist you with any questions, concerns, 
             or styling advice. Whether it's help with sizing, tracking your order, or managing returns, 
             we ensure quick and friendly assistance every step of the way. Your satisfaction is our priority,
              and we're committed to making your shopping experience smooth and enjoyable</p>
        </div>

      </div>
    </div>
  )
}

export default About
