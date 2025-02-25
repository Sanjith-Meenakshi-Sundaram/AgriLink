import React, { useEffect, useState } from "react";
import avatar from "../../../assets/avatar.png";
import Similarproducts from "./SimilarProducts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

const sharedClasses = {
  textGray: "text-zinc-600 dark:white",
  roundedFull: "rounded-full",
  roundedLg: "rounded-lg",
  mb4: "mb-4",
  flexSpaceX2: "flex space-x-2",
  buttonBase: "px-4 py-2 border rounded-lg dark:white",
  buttonGreen: "px-4 py-2 bg-[#ebb207ff] text-black rounded-lg",
};

const ProductImage = ({ thumbnail, images }) => (
  <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
    <img
      src={thumbnail}
      alt="Product Image"
      className={`${sharedClasses.roundedLg} ${sharedClasses.mb4} w-full h-auto max-h-[50vh] object-contain`}
    />
    <div
      className={`${sharedClasses.flexSpaceX2} ${sharedClasses.mb4} justify-center`}>
      {images?.map((i) => (
        <img
          key={i}
          src={i}
          alt={`Thumbnail ${i}`}
          className="w-1/4 h-auto rounded-lg object-cover"
        />
      ))}
    </div>
  </div>
);

const ProductDetails = ({ product }) => {
  return (
    <div className="w-full lg:w-1/2 lg:pl-6">
      <h2 className="text-2xl font-bold mb-2  sm:text-2xl md:text-3xl  md:mb-8 text-black">
        {product?.title}
      </h2>
      <p className={`${sharedClasses.textGray} ${sharedClasses.mb4}`}>
        {product?.description}
      </p>
      <p className="text-xl font-semibold mb-2">
        ₹{product?.newPrice} <span className="line-through text-zinc-500">{product?.price}</span> ({product?.discountPercentage}% OFF)
      </p>
      <p className="text-zinc-500 dark:white mb-4">Inclusive of taxes</p>
      {/* <ColorOptions />
      <SizeOptions /> */}
      <DeliveryOptions />
      <ActionButtons product={product} />
      <ProductInfo product={product} />
      <ProductRatings product={product} />
    </div>
  )
};

// const ColorOptions = () => (
//   <div className={sharedClasses.mb4}>
//     <label className="block text-zinc-700 dark:white mb-2">More Colors</label>
//     <div className={sharedClasses.flexSpaceX2}>
//       {["zinc-600", "zinc-800", "black"].map((color, index) => (
//         <div key={index} className={`w-8 h-8 bg-${color} rounded-full`}></div>
//       ))}
//     </div>
//   </div>
// );

// const SizeOptions = () => (
//   <div className={sharedClasses.mb4}>
//     <label className="block text-zinc-700 dark:white mb-2">Select Size</label>
//     <div className={sharedClasses.flexSpaceX2}>
//       {["S", "M", "L"].map((size) => (
//         <button
//           key={size}
//           className={sharedClasses.buttonBase}
//           style={{
//             border: "1px solid black",
//           }}>
//           {size}{" "}
//         </button>
//       ))}
//     </div>
//   </div>
// );

const DeliveryOptions = () => (
  <div className={sharedClasses.mb4}>
    <label className="block text-zinc-700 dark:white mb-2">
      Delivery Options
    </label>
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <input
        type="text"
        placeholder="Enter Pincode"
        className="px-4 py-2 border rounded-lg flex-grow"
      />
      <button className={`${sharedClasses.buttonGreen} whitespace-nowrap`}>
        Check
      </button>
    </div>
  </div>
);

const ActionButtons = ({ product }) => {
  const navigate = useNavigate();

  const onAddToCart = () => {
    // Add to cart logic here
  };

  const onAddToWishlist = () => {
    // Add to wishlist logic here
  };

  return (
    <div className={`${sharedClasses.mb4} space-y-2`}>
      <Link to='cart'><button
        className={`${sharedClasses.buttonGreen} w-full  transition-colors bg-[#ebb207ff]`}
        onClick={onAddToCart}
      >
        Add to cart
      </button></Link>
      <button
        className="w-full px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors"
        onClick={onAddToWishlist}
      >
        Add to wishlist
      </button>
    </div>
  );
};

const ProductInfo = ({ product }) => (
  <div className={sharedClasses.mb4}>
    <h3 className="text-lg font-semibold mb-2">Product Details</h3>
    {product?.category && <p>Category: {product.category}</p>}
    {product?.availabilityStatus && <p>Availability Status: {product.availabilityStatus}</p>}
    {product?.brand && <p>Brand: {product.brand}</p>}
    {product?.returnPolicy && <p>Return Policy: {product.returnPolicy}</p>}
    {product?.warrantyInformation && <p>Warranty Information: {product.warrantyInformation}</p>}
    {product?.shippingInformation && <p>Shipping Information: {product.shippingInformation}</p>}
  </div>
);

const ProductRatings = ({ product }) => {
  const calculatePercentages = () => {
    const totalReviews = product?.reviews.length || 0;

    const counts = product?.reviews?.reduce((acc, review) => {
      if (review.rating === 5) acc.excellent++;
      else if (review.rating === 4) acc.veryGood++;
      else if (review.rating === 3 || review.rating === 2) acc.good++;
      else if (review.rating === 1 || review.rating === 0) acc.low++;
      return acc;
    }, { excellent: 0, veryGood: 0, good: 0, low: 0 });


    return [
      { label: "Excellent", width: (counts?.excellent / totalReviews) * 100 },
      { label: "Very Good", width: (counts?.veryGood / totalReviews) * 100 },
      { label: "Good", width: (counts?.good / totalReviews) * 100 },
      { label: "Low", width: (counts?.low / totalReviews) * 100 }
    ];
  };

  return (
    <div className={sharedClasses.mb4}>
      <h3 className="text-lg font-semibold mb-2">Product Ratings & Reviews</h3>
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold">{product?.rating}</span>
        <span className="text-yellow-500 ml-2">★</span>
      </div>
      <p className={`${sharedClasses.textGray} mb-2`}>Total reviews {product?.reviews.length}</p>
      {calculatePercentages().map((rating, index) => (
        <RatingBar key={index} {...rating} />
      ))}
    </div>
  )
};

const RatingBar = ({ label, width }) => (
  <div className="flex items-center mb-1">
    <span className={`flex-1 ${sharedClasses.textGray}`}>{label}</span>
    <div className="w-4/5 relative bg-green-300 rounded-lg">
      <div style={{ width: `${width}%` }} className={`bg-green-700 h-2 rounded-lg`}></div>
    </div>
  </div>
);

const CustomerFeedback = ({ reviews }) => (
  <div className="mt-8 px-4 ">
    <h3 className="text-lg font-semibold mb-2">Customer Feedback</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {
        reviews?.map((review, index) => {
          return (
            <div key={index} className="p-4 bg-[#798280ff] rounded-lg text-white">
              <div className="flex items-center mb-2">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className={`w-12 h-12 ${sharedClasses.roundedFull} mr-2`}
                />
                <div>
                  <p className="font-semibold">{review?.reviewerName}</p>
                  <p className="text-sm text-white">{review?.reviewerEmail}</p>
                </div>
              </div>
              <p className="mb-2 text-white">
                {review?.comment}
              </p>
            </div>
          )
        })
      }
    </div>
  </div>
);

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#fffde8ff]">
      <div className="container max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <ProductImage thumbnail={product?.thumbnail} images={product?.images} />
          <ProductDetails product={product} />
        </div>
        <CustomerFeedback reviews={product?.reviews} />
        <Similarproducts />
      </div>
    </div>
  );
};

export default ProductPage;
