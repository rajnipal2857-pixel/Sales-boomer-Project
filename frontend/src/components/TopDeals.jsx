import React from "react";
import {
  Flame,
  ArrowRight
} from "lucide-react";

import ProductCard from "./ProductCard";


const products = [

  {
    id: 1,
    name: "Nike Revolution Running Shoes",
    store: "Amazon",
    storeClass: "amazon-product",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.5,
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },

  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    store: "Flipkart",
    storeClass: "flipkart-product",
    price: 1299,
    originalPrice: 2999,
    discount: 57,
    rating: 4.3,
    reviews: "1.8k",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"
  },

  {
  id: 3,
  name: "Women's Printed Kurta Set",
  store: "Myntra",
  storeClass: "myntra-product",
  price: 899,
  originalPrice: 1999,
  discount: 55,
  rating: 4.6,
  reviews: "3.4k",
  image:
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600"
},

{
  id: 4,
  name: "Apple iPhone 15",
  store: "Amazon",
  storeClass: "amazon-product",
  price: 58999,
  originalPrice: 69999,
  discount: 16,
  rating: 4.7,
  reviews: "8.2k",
  image:
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop"
}

];


function TopDeals() {

  return (

    <section className="top-deals-section">

      {/* Heading */}

      <div className="section-heading">

        <div>

          <span className="section-label">
            DON'T MISS OUT
          </span>

          <h2>
            <Flame
              size={23}
              fill="currentColor"
            />

            Top Deals
          </h2>

          <p>
            Handpicked deals with the biggest discounts
          </p>

        </div>


        <button className="view-all-button">

          View All

          <ArrowRight size={15} />

        </button>

      </div>


      {/* Products */}

      <div className="products-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}

export default TopDeals;