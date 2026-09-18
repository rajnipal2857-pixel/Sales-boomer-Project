import React from "react";
import {
  Heart,
  Star,
  ExternalLink
} from "lucide-react";

function ProductCard({ product }) {

  return (
    <article className="product-card">

      {/* Product Image */}
      <div className="product-image-container">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {/* Discount */}
        <span className="product-discount">
          {product.discount}% OFF
        </span>

        {/* Wishlist */}
        <button
          className="product-wishlist"
          aria-label="Add to wishlist"
        >
          <Heart size={17} />
        </button>

      </div>


      {/* Product Information */}
      <div className="product-info">

        {/* Store */}
        <div className="product-store">

          <span
            className={`product-store-logo ${product.storeClass}`}
          >
            {product.store.charAt(0)}
          </span>

          <span>
            {product.store}
          </span>

        </div>


        {/* Product Name */}
        <h3 className="product-name">
          {product.name}
        </h3>


        {/* Rating */}
        <div className="product-rating">

          <Star
            size={13}
            fill="currentColor"
          />

          <span>
            {product.rating}
          </span>

          <span className="rating-count">
            ({product.reviews})
          </span>

        </div>


        {/* Price */}
        <div className="product-price">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </del>

        </div>


        {/* Deal Button */}
        <button className="view-deal-button">

          View Deal

          <ExternalLink size={14} />

        </button>

      </div>

    </article>
  );
}

export default ProductCard;