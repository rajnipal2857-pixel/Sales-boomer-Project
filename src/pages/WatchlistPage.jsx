import React, { useEffect, useState } from "react";

import {
  Heart,
  ExternalLink,
  Trash2,
  Star,
  Search
} from "lucide-react";

function WatchlistPage() {

  // =====================================================
  // USER
  // =====================================================

  const userEmail = "test@gmail.com";


  // =====================================================
  // STATES
  // =====================================================

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);


  // =====================================================
  // FETCH WATCHLIST + DEAL DATA
  // =====================================================

  useEffect(() => {

    const loadWatchlist = async () => {

      try {

        setLoading(true);
        setError("");

        // -------------------------------------------------
        // GET USER WATCHLIST
        // -------------------------------------------------

        const watchlistResponse = await fetch(
          `http://localhost:8080/api/watchlist/${encodeURIComponent(userEmail)}`
        );

        if (!watchlistResponse.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const watchlistData =
          await watchlistResponse.json();

        console.log(
          "Watchlist from backend:",
          watchlistData
        );


        // -------------------------------------------------
        // GET ALL DEALS
        // -------------------------------------------------

        const dealsResponse = await fetch(
          "http://localhost:8080/api/deals"
        );

        if (!dealsResponse.ok) {
          throw new Error("Failed to fetch deals");
        }

        const dealsData =
          await dealsResponse.json();

        console.log(
          "Deals from backend:",
          dealsData
        );


        // -------------------------------------------------
        // MATCH WATCHLIST WITH DEALS
        // -------------------------------------------------

        const matchedDeals = watchlistData
          .map((watchItem) => {

            const deal = dealsData.find(
              (deal) =>
                Number(deal.id) ===
                Number(watchItem.dealId)
            );

            if (!deal) {
              return null;
            }

            return {

              // Watchlist data
              watchlistId: watchItem.id,
              dealId: watchItem.dealId,
              userEmail: watchItem.userEmail,

              // Deal data
              product: deal.product,
              store: deal.store,
              storeClass: deal.storeClass,
              image: deal.image,
              price: deal.price,
              oldPrice: deal.oldPrice,
              discount: deal.discount,
              rating: deal.rating,
              reviews: deal.reviews,
              dealUrl: deal.dealUrl

            };

          })
          .filter(Boolean);


        console.log(
          "Matched watchlist deals:",
          matchedDeals
        );

        setWatchlist(matchedDeals);

      }

      catch (err) {

        console.error(
          "Watchlist error:",
          err
        );

        setError(
          "Unable to load your watchlist."
        );

      }

      finally {

        setLoading(false);

      }

    };

    loadWatchlist();

  }, []);


  // =====================================================
  // REMOVE FROM WATCHLIST
  // =====================================================

  const removeFromWatchlist = async (dealId) => {

    try {

      setRemovingId(dealId);

      const url =
        `http://localhost:8080/api/watchlist/${dealId}/${encodeURIComponent(userEmail)}`;

      console.log(
        "Deleting watchlist item:",
        url
      );

      const response = await fetch(
        url,
        {
          method: "DELETE"
        }
      );


      // -------------------------------------------------
      // CHECK RESPONSE
      // -------------------------------------------------

      if (!response.ok) {

        let errorMessage =
          "Failed to remove deal.";

        try {

          const errorData =
            await response.json();

          console.error(
            "Backend DELETE error:",
            errorData
          );

          if (errorData.message) {
            errorMessage =
              errorData.message;
          }

        }

        catch {
          // Response was not JSON
        }

        throw new Error(errorMessage);

      }


      // -------------------------------------------------
      // REMOVE FROM UI
      // -------------------------------------------------

      setWatchlist((current) =>
        current.filter(
          (item) =>
            Number(item.dealId) !==
            Number(dealId)
        )
      );


    }

    catch (err) {

      console.error(
        "Remove watchlist error:",
        err
      );

      alert(
        `Unable to remove this deal.\n\n${err.message}`
      );

    }

    finally {

      setRemovingId(null);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="watchlist-page">

        <div className="watchlist-empty">

          <Heart size={40} />

          <h2>
            Loading your Watchlist...
          </h2>

          <p>
            Getting your saved deals.
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

      <section className="watchlist-page">

        <div className="watchlist-empty">

          <Search size={40} />

          <h2>
            {error}
          </h2>

          <p>
            Make sure your Spring Boot backend is running.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // EMPTY WATCHLIST
  // =====================================================

  if (watchlist.length === 0) {

    return (

      <section className="watchlist-page">

        <div className="watchlist-header">

          <div>

            <div className="watchlist-eyebrow">

              <Heart size={14} />

              YOUR SAVED DEALS

            </div>

            <h1>
              Watchlist
            </h1>

            <p>
              Save your favorite deals and find them
              whenever you need them.
            </p>

          </div>

        </div>


        <div className="watchlist-empty">

          <Heart size={45} />

          <h2>
            Your Watchlist is Empty
          </h2>

          <p>
            Click the ❤️ on a deal to save it here.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // WATCHLIST UI
  // =====================================================

  return (

    <section className="watchlist-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="watchlist-header">

        <div>

          <div className="watchlist-eyebrow">

            <Heart size={14} />

            YOUR SAVED DEALS

          </div>

          <h1>
            Watchlist
          </h1>

          <p>
            Your favorite deals saved in one place.
          </p>

        </div>


        <div className="watchlist-count">

          <Heart size={20} />

          <div>

            <strong>
              {watchlist.length}
            </strong>

            <span>
              Saved Deals
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          PRODUCTS
      ================================================= */}

      <div className="watchlist-grid">

        {watchlist.map((item) => (

          <article
            className="watchlist-card"
            key={item.watchlistId}
          >


            {/* IMAGE */}

            <div className="watchlist-image">

              <img
                src={item.image}
                alt={item.product}
              />


              {item.discount && (

                <span className="watchlist-discount">
                  {item.discount}
                </span>

              )}


              {/* REMOVE BUTTON */}

              <button
                className="watchlist-remove"
                onClick={() =>
                  removeFromWatchlist(item.dealId)
                }
                disabled={
                  removingId === item.dealId
                }
                title="Remove from Watchlist"
                aria-label="Remove from Watchlist"
              >

                <Trash2 size={16} />

              </button>

            </div>


            {/* INFORMATION */}

            <div className="watchlist-info">


              {/* STORE */}

              <div className="watchlist-store">

                <span
                  className={
                    `watchlist-store-logo ${
                      item.storeClass || ""
                    }`
                  }
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


              {/* RATING */}

              {item.rating && (

                <div className="watchlist-rating">

                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  <strong>
                    {item.rating}
                  </strong>

                  {item.reviews && (

                    <span>
                      ({item.reviews})
                    </span>

                  )}

                </div>

              )}


              {/* PRICE */}

              <div className="watchlist-price">

                <strong>
                  {item.price}
                </strong>

                {item.oldPrice && (

                  <del>
                    {item.oldPrice}
                  </del>

                )}

              </div>


              {/* VIEW DEAL */}

              <button
                className="watchlist-deal-button"
                onClick={() => {

                  if (item.dealUrl) {

                    window.open(
                      item.dealUrl,
                      "_blank",
                      "noopener,noreferrer"
                    );

                  }

                }}
              >

                View Deal

                <ExternalLink size={13} />

              </button>

            </div>

          </article>

        ))}

      </div>

    </section>

  );

}

export default WatchlistPage;