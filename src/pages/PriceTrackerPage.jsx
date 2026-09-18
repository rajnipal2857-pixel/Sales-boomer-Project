import React, { useEffect, useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  Search,
  ExternalLink,
  Trash2,
  Clock3
} from "lucide-react";


function PriceTrackerPage() {

  const userEmail = "test@gmail.com";

  const [trackedProducts, setTrackedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // LOAD TRACKED PRODUCTS
  // =====================================================

  useEffect(() => {

    const loadTrackedProducts = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/price-tracker/${encodeURIComponent(
            userEmail
          )}`
        );


        if (!response.ok) {
          throw new Error(
            "Failed to fetch tracked products"
          );
        }


        const data = await response.json();

        console.log(
          "Price Tracker from backend:",
          data
        );


        setTrackedProducts(data);

      }

      catch (err) {

        console.error(
          "Price Tracker error:",
          err
        );

        setError(
          "Unable to load your tracked products."
        );

      }

      finally {

        setLoading(false);

      }

    };


    loadTrackedProducts();

  }, []);


  // =====================================================
  // REMOVE FROM PRICE TRACKER
  // =====================================================

  const removeTracker = async (dealId) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/price-tracker/${dealId}/${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to remove tracker"
        );

      }


      setTrackedProducts(
        (current) =>
          current.filter(
            (item) =>
              Number(item.dealId) !==
              Number(dealId)
          )
      );

    }

    catch (err) {

      console.error(
        "Remove tracker error:",
        err
      );

      alert(
        "Unable to remove this product."
      );

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="price-tracker-page">

        <div className="price-tracker-empty">

          <TrendingUp size={40} />

          <h2>
            Loading Price Tracker...
          </h2>

          <p>
            Getting your tracked products.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <section className="price-tracker-page">

        <div className="price-tracker-empty">

          <Search size={40} />

          <h2>
            {error}
          </h2>

          <p>
            Make sure your Spring Boot backend
            is running.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // EMPTY
  // =====================================================

  if (trackedProducts.length === 0) {

    return (

      <section className="price-tracker-page">

        <div className="price-tracker-header">

          <div>

            <div className="price-tracker-eyebrow">

              <TrendingUp size={14} />

              PRICE TRACKER

            </div>

            <h1>
              Price Tracker
            </h1>

            <p>
              Track your favorite products and
              monitor their price changes.
            </p>

          </div>

        </div>


        <div className="price-tracker-empty">

          <TrendingUp size={45} />

          <h2>
            No Products Being Tracked
          </h2>

          <p>
            Add products from Top Deals to
            start tracking their prices.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <section className="price-tracker-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="price-tracker-header">

        <div>

          <div className="price-tracker-eyebrow">

            <TrendingUp size={14} />

            PRICE TRACKER

          </div>


          <h1>
            Price Tracker
          </h1>


          <p>
            Monitor how the prices of your tracked
            products change over time.
          </p>

        </div>


        <div className="price-tracker-count">

          <TrendingUp size={20} />

          <div>

            <strong>
              {trackedProducts.length}
            </strong>

            <span>
              Tracked Products
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          PRODUCTS
      ================================================= */}

      <div className="price-tracker-grid">

        {trackedProducts.map((item) => {

          const priceChange =
            Number(item.priceChange || 0);

          const priceDropped =
            priceChange < 0;


          return (

            <article
              className="price-tracker-card"
              key={item.id}
            >


              {/* IMAGE */}

              <div className="price-tracker-image">

                <img
                  src={item.image}
                  alt={item.product}
                />

              </div>


              {/* INFORMATION */}

              <div className="price-tracker-info">


                {/* STORE */}

                <div className="price-tracker-store">

                  <span
                    className={`price-tracker-store-logo ${
                      item.storeClass || ""
                    }`}
                  >

                    {item.store
                      ? item.store.charAt(0)
                      : "S"}

                  </span>


                  <span>
                    {item.store}
                  </span>

                </div>


                {/* PRODUCT */}

                <h3>
                  {item.product}
                </h3>


                {/* CURRENT PRICE */}

                <div className="price-tracker-current">

                  <span>
                    Current Price
                  </span>

                  <strong>
                    {item.price}
                  </strong>

                </div>


                {/* TRACKED PRICE */}

                <div className="price-tracker-old">

                  <span>
                    Previous Price
                  </span>

                  <strong>
                    ₹
                    {Number(
                      item.trackedPrice
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>


                {/* PRICE CHANGE */}

                <div
                  className={`price-tracker-change ${
                    priceDropped
                      ? "price-down"
                      : "price-up"
                  }`}
                >

                  {priceDropped ? (
                    <TrendingDown size={16} />
                  ) : (
                    <TrendingUp size={16} />
                  )}


                  <span>

                    {priceDropped
                      ? "Price dropped"
                      : "Price increased"
                    }

                  </span>


                  <strong>

                    ₹
                    {Math.abs(
                      priceChange
                    ).toLocaleString("en-IN")}

                  </strong>

                </div>


                {/* TIME */}

                <div className="price-tracker-time">

                  <Clock3 size={12} />

                  Price tracking active

                </div>


                {/* ACTIONS */}

                <div className="price-tracker-actions">

                  <button
                    className="price-tracker-view"
                    type="button"
                  >

                    View Deal

                    <ExternalLink size={13} />

                  </button>


                  <button
                    className="price-tracker-delete"
                    type="button"
                    onClick={() =>
                      removeTracker(
                        item.dealId
                      )
                    }
                    title="Remove from Price Tracker"
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </div>

            </article>

          );

        })}

      </div>

    </section>

  );

}


export default PriceTrackerPage;