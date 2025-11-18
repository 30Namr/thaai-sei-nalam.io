import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      if (found.image && found.image.length > 0) {
        setImage(found.image[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/** ------------ Product Data  -------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/** ----------- Product Images ----------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal
          sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                onClick={() => setImage(item)} />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            {image && <img src={image} alt="Main Product" className='w-full h-auto' />}
          </div>
        </div>
        {/** --------- Product Info -------- */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 rounded-md transition-all duration-200
                     ${item === size ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-100 text-black hover:bg-gray-200'}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          
          <button onClick={() => { addToCart(productData._id, size); toast.success("Product added to cart!"); }}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Products.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/** ----------- Description & Review Section ------- */}
      <div className="mt-20 ">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Stay cool and stylish this summer with our lightweight floral dress. Made from 100% breathable cotton, it features a flattering A-line silhouette, adjustable straps, and a soft inner lining for all-day comfort.
            Whether you're heading to brunch or a beach vacation, this dress is your go-to for effortless elegance</p>
          <p>This premium cotton T-shirt is your everyday essential. Soft, breathable, and lightweight — perfect for lounging,
            running errands, or layering under a jacket. Features a classic crew neck and a comfortable relaxed fit.</p>
        </div>
      </div>

      {/** ---------- Display Related Products -------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product