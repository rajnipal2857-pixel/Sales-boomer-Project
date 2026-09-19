import React from "react";
import {
  TrendingDown,
  ArrowRight,
  ExternalLink
} from "lucide-react";

const priceDrops = [
  {
    id: 1,
    name: "Sony Wireless Headphones",
    store: "Amazon",
    storeClass: "amazon-product",
    currentPrice: 3499,
    oldPrice: 5999,
    drop: 42,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
  },

  {
    id: 2,
    name: "Adidas Running Shoes",
    store: "Myntra",
    storeClass: "myntra-product",
    currentPrice: 2799,
    oldPrice: 4999,
    drop: 44,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
  },

  {
    id: 3,
    name: "Samsung Galaxy Smartphone",
    store: "Flipkart",
    storeClass: "flipkart-product",
    currentPrice: 22999,
    oldPrice: 29999,
    drop: 23,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
  },

  {
    id: 4,
    name: "Smart Fitness Watch",
    store: "Amazon",
    storeClass: "amazon-product",
    currentPrice: 3999,
    oldPrice: 6999,
    drop: 43,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
  }
];

function PriceDrops() {

  return (
    <section className="price-drops-section">

      {/* Heading */}

      <div className="section-heading">

        <div>

          <span className="section-label">
            PRICE ALERT
          </span>

          <h2 className="price-drop-title">

            <TrendingDown
              size={23}
            />

            Biggest Price Drops

          </h2>

          <p>
            Products that just became cheaper
          </p>

        </div>

        <button className="view-all-button">

          View All

          <ArrowRight size={15} />

        </button>

      </div>


      {/* Price Drop List */}

      <div className="price-drop-list">

        {priceDrops.map((product) => (

          <div
            className="price-drop-item"
            key={product.id}
          >

            {/* Product */}

            <div className="price-drop-product">

              <div className="price-drop-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="price-drop-info">

                <div className="price-drop-store">

                  <span
                    className={`product-store-logo ${product.storeClass}`}
                  >
                    {product.store.charAt(0)}
                  </span>

                  {product.store}

                </div>

                <h3>
                  {product.name}
                </h3>

              </div>

            </div>


            {/* Old Price */}

            <div className="price-drop-old">

              <span>
                Previous Price
              </span>

              <del>
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </del>

            </div>


            {/* Current Price */}

            <div className="price-drop-current">

              <span>
                Current Price
              </span>

              <strong>
                ₹{product.currentPrice.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* Drop */}

            <div className="price-drop-percent">

              <span>
                Price Drop
              </span>

              <strong>
                ↓ {product.drop}%
              </strong>

            </div>


            {/* Button */}

            <button className="price-drop-button">

              <ExternalLink size={14} />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default PriceDrops;