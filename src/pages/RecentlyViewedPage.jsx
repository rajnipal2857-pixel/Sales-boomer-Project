import React from "react";

import {
  History,
  Search,
  Heart,
  ExternalLink,
  Clock3,
  Trash2
} from "lucide-react";


const recentlyViewed = [
  {
    id: 1,
    name: "Nike Air Max Running Shoes",
    store: "Myntra",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    price: "₹5,799",
    oldPrice: "₹6,999",
    discount: "17% OFF",
    viewed: "10 minutes ago",
    storeClass: "myntra-product"
  },
  {
    id: 2,
    name: "Samsung Galaxy Buds",
    store: "Amazon",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
    price: "₹4,699",
    oldPrice: "₹5,499",
    discount: "15% OFF",
    viewed: "1 hour ago",
    storeClass: "amazon-product"
  },
  {
    id: 3,
    name: "Apple AirPods Pro",
    store: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80",
    price: "₹18,999",
    oldPrice: "₹24,900",
    discount: "24% OFF",
    viewed: "3 hours ago",
    storeClass: "flipkart-product"
  },
  {
    id: 4,
    name: "Lakme Absolute Makeup Kit",
    store: "Nykaa",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80",
    price: "₹1,299",
    oldPrice: "₹1,899",
    discount: "32% OFF",
    viewed: "Yesterday",
    storeClass: "myntra-product"
  }
];


function RecentlyViewedPage() {

  return (
    <div className="recently-viewed-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="recently-viewed-header">

        <div>

          <div className="recently-viewed-label">
            <History size={15} />
            RECENT ACTIVITY
          </div>

          <h1>
            Recently Viewed
          </h1>

          <p>
            Products and deals you viewed recently.
          </p>

        </div>


        <button className="clear-history-button">
          <Trash2 size={15} />
          Clear History
        </button>

      </section>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="recently-viewed-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search recently viewed products..."
        />

      </div>


      {/* =========================
          SUMMARY
      ========================= */}

      <div className="recently-viewed-summary">

        <div className="recent-summary-card">

          <div className="recent-summary-icon">
            <History size={20} />
          </div>

          <div>
            <strong>4</strong>
            <span>Recently Viewed</span>
          </div>

        </div>


        <div className="recent-summary-card">

          <div className="recent-summary-icon heart">
            <Heart size={20} />
          </div>

          <div>
            <strong>0</strong>
            <span>Saved Items</span>
          </div>

        </div>

      </div>


      {/* =========================
          SECTION
      ========================= */}

      <section className="recent-products-section">

        <div className="recent-section-heading">

          <div>
            <span>YOUR ACTIVITY</span>
            <h2>Viewed Products</h2>
          </div>

          <p>
            4 products
          </p>

        </div>


        {/* =========================
            PRODUCTS
        ========================= */}

        <div className="recent-products-list">

          {recentlyViewed.map((product) => (

            <div
              className="recent-product-card"
              key={product.id}
            >

              {/* IMAGE */}

              <div className="recent-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span className="recent-discount">
                  {product.discount}
                </span>

              </div>


              {/* INFO */}

              <div className="recent-product-info">

                <div className="recent-store">

                  <span
                    className={`recent-store-logo ${product.storeClass}`}
                  >
                    {product.store.charAt(0)}
                  </span>

                  {product.store}

                </div>


                <h3>
                  {product.name}
                </h3>


                <div className="recent-price">

                  <strong>
                    {product.price}
                  </strong>

                  <del>
                    {product.oldPrice}
                  </del>

                </div>


                <div className="recent-view-time">

                  <Clock3 size={13} />

                  Viewed {product.viewed}

                </div>

              </div>


              {/* ACTIONS */}

              <div className="recent-product-actions">

                <button
                  className="recent-wishlist"
                  title="Add to Watchlist"
                >
                  <Heart size={17} />
                </button>


                <button className="recent-deal-button">

                  View Deal

                  <ExternalLink size={14} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}


export default RecentlyViewedPage;