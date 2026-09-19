import React from "react";
import {
  ArrowRight,
  ExternalLink,
  ShoppingBag
} from "lucide-react";

const stores = [
  {
    id: 1,
    name: "Myntra",
    shortName: "M",
    deals: "240+",
    discount: "Up to 80% OFF",
    className: "store-myntra",
    description: "Fashion & lifestyle deals"
  },
  {
    id: 2,
    name: "Amazon",
    shortName: "A",
    deals: "180+",
    discount: "Up to 70% OFF",
    className: "store-amazon",
    description: "Everything you need"
  },
  {
    id: 3,
    name: "Flipkart",
    shortName: "F",
    deals: "210+",
    discount: "Up to 75% OFF",
    className: "store-flipkart",
    description: "Best online shopping"
  },
  {
    id: 4,
    name: "AJIO",
    shortName: "A",
    deals: "150+",
    discount: "Up to 65% OFF",
    className: "store-ajio",
    description: "Trendy fashion deals"
  },
  {
    id: 5,
    name: "Nykaa",
    shortName: "N",
    deals: "130+",
    discount: "Up to 60% OFF",
    className: "store-nykaa",
    description: "Beauty & wellness deals"
  }
];

function StoreDeals() {
  return (
    <section className="store-deals-section">

      {/* =========================
          SECTION HEADING
      ========================= */}

      <div className="section-heading">

        <div>
          <span className="section-label">
            SHOP SMART
          </span>

          <h2 className="store-deals-title">
            <ShoppingBag size={23} />
            Deals by Store
          </h2>

          <p>
            Explore the best offers from your favorite stores
          </p>
        </div>

        <button className="view-all-button">
          View All
          <ArrowRight size={15} />
        </button>

      </div>


      {/* =========================
          STORE GRID
      ========================= */}

      <div className="stores-grid">

        {stores.map((store) => (

          <div
            className={`store-deal-card ${store.className}`}
            key={store.id}
          >

            {/* Store Logo */}

            <div className="store-deal-top">

              <div className="large-store-icon">
                {store.shortName}
              </div>

              <button
                className="store-external-button"
                aria-label={`Open ${store.name}`}
              >
                <ExternalLink size={14} />
              </button>

            </div>


            {/* Store Information */}

            <div className="store-deal-info">

              <h3>
                {store.name}
              </h3>

              <p>
                {store.description}
              </p>

            </div>


            {/* Deal Statistics */}

            <div className="store-deal-stats">

              <div>
                <strong>
                  {store.deals}
                </strong>

                <span>
                  Deals
                </span>
              </div>

              <div>
                <strong>
                  {store.discount}
                </strong>

                <span>
                  Discount
                </span>
              </div>

            </div>


            {/* Explore Button */}

            <button className="explore-store-button">

              Explore Store

              <ArrowRight size={14} />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default StoreDeals;