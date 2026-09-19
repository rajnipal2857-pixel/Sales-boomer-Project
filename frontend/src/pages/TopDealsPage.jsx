import React, { useEffect, useState } from "react";

import {
  Flame,
  Search,
  SlidersHorizontal,
  Heart,
  Star,
  ExternalLink,
  ArrowDownUp,
  Bell,
  X,
  TrendingUp
} from "lucide-react";


const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home",
  "Sports"
];


const stores = [
  "All Stores",
  "Amazon",
  "Myntra",
  "Flipkart",
  "Nykaa"
];


function TopDealsPage() {

  // =====================================================
  // DEALS
  // =====================================================

  const [deals, setDeals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [activeStore, setActiveStore] =
    useState("All Stores");

  const [sortBy, setSortBy] =
    useState("Featured");


  // =====================================================
  // WATCHLIST
  // =====================================================

  const [wishlist, setWishlist] = useState([]);

  const [loadingWishlist, setLoadingWishlist] =
    useState(true);


  // =====================================================
  // PRICE TRACKER
  // =====================================================

  const [trackedProducts, setTrackedProducts] =
    useState([]);

  const [loadingTracker, setLoadingTracker] =
    useState(true);


  // =====================================================
  // ALERT STATE
  // =====================================================

  const [alertDeal, setAlertDeal] =
    useState(null);

  const [targetPrice, setTargetPrice] =
    useState("");

  const [savingAlert, setSavingAlert] =
    useState(false);


  // =====================================================
  // USER
  // =====================================================

  const userEmail = "test@gmail.com";


  // =====================================================
  // FETCH DEALS
  // =====================================================

  useEffect(() => {

    fetch("http://localhost:8080/api/deals")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch deals");
        }

        return response.json();

      })

      .then((data) => {

        const formattedDeals = data.map((deal) => {

          let category = "Electronics";

          const productName =
            (deal.product || "").toLowerCase();


          if (
            deal.store === "Myntra" ||
            productName.includes("shirt") ||
            productName.includes("shoes") ||
            productName.includes("jacket")
          ) {
            category = "Fashion";
          }


          if (
            deal.store === "Nykaa" ||
            productName.includes("makeup") ||
            productName.includes("beauty")
          ) {
            category = "Beauty";
          }


          if (
            productName.includes("air fryer")
          ) {
            category = "Home";
          }


          if (
            productName.includes("speaker") ||
            productName.includes("headphone") ||
            productName.includes("earbuds") ||
            productName.includes("airpods") ||
            productName.includes("smartwatch")
          ) {
            category = "Electronics";
          }


          return {

            id: deal.id,

            name: deal.product,

            store: deal.store,

            storeClass: deal.storeClass,

            storeLetter:
              deal.store
                ? deal.store.charAt(0)
                : "",

            category,

            price: deal.price,

            oldPrice: deal.oldPrice,

            discount: deal.discount,

            rating: deal.rating,

            reviews: deal.reviews,

            image: deal.image

          };

        });


        setDeals(formattedDeals);

        setLoading(false);

      })

      .catch((err) => {

        console.error(
          "Error loading deals:",
          err
        );

        setError(
          "Unable to load deals from backend."
        );

        setLoading(false);

      });

  }, []);


  // =====================================================
  // FETCH WATCHLIST
  // =====================================================

  useEffect(() => {

    fetch(
      `http://localhost:8080/api/watchlist/${encodeURIComponent(
        userEmail
      )}`
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to load watchlist"
          );
        }

        return response.json();

      })

      .then((data) => {

        const savedDealIds =
          data
            .map((item) => item.dealId)
            .filter(
              (id) =>
                id !== null &&
                id !== undefined
            )
            .map(Number);


        setWishlist(savedDealIds);

      })

      .catch((err) => {

        console.error(
          "Error loading watchlist:",
          err
        );

      })

      .finally(() => {

        setLoadingWishlist(false);

      });

  }, []);


  // =====================================================
  // FETCH PRICE TRACKER
  // =====================================================

  useEffect(() => {

    fetch(
      `http://localhost:8080/api/price-tracker/${encodeURIComponent(
        userEmail
      )}`
    )

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to load price tracker"
          );
        }

        return response.json();

      })

      .then((data) => {

        const trackedDealIds =
          data
            .map((item) => item.dealId)
            .filter(
              (id) =>
                id !== null &&
                id !== undefined
            )
            .map(Number);


        setTrackedProducts(trackedDealIds);

      })

      .catch((err) => {

        console.error(
          "Error loading price tracker:",
          err
        );

      })

      .finally(() => {

        setLoadingTracker(false);

      });

  }, []);


  // =====================================================
  // ADD / REMOVE WATCHLIST
  // =====================================================

  const toggleWishlist = async (dealId) => {

    const numericDealId = Number(dealId);

    const isAlreadySaved =
      wishlist.includes(numericDealId);


    try {

      // -------------------------------------------------
      // REMOVE
      // -------------------------------------------------

      if (isAlreadySaved) {

        const response = await fetch(
          `http://localhost:8080/api/watchlist/${numericDealId}/${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "DELETE"
          }
        );


        const responseText =
          await response.text();


        if (!response.ok) {

          throw new Error(
            responseText ||
            `Failed to remove watchlist item (${response.status})`
          );

        }


        setWishlist((current) =>
          current.filter(
            (id) => id !== numericDealId
          )
        );

        return;
      }


      // -------------------------------------------------
      // ADD
      // -------------------------------------------------

      const response = await fetch(
        "http://localhost:8080/api/watchlist",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            dealId: numericDealId,

            userEmail

          })

        }
      );


      const responseText =
        await response.text();


      if (!response.ok) {

        throw new Error(
          responseText ||
          `Failed to add watchlist item (${response.status})`
        );

      }


      setWishlist((current) => {

        if (current.includes(numericDealId)) {
          return current;
        }

        return [
          ...current,
          numericDealId
        ];

      });

    }

    catch (err) {

      console.error(
        "WATCHLIST ERROR:",
        err
      );


      alert(
        `Unable to update watchlist.\n\n${err.message}`
      );

    }

  };


  // =====================================================
  // ADD TO PRICE TRACKER
  // POST /api/price-tracker
  // =====================================================

  const trackPrice = async (deal) => {

    const numericDealId = Number(deal.id);


    // Already tracked
    if (
      trackedProducts.includes(
        numericDealId
      )
    ) {

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/price-tracker",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            dealId: numericDealId,

            userEmail

          })

        }
      );


      const responseText =
        await response.text();


      console.log(
        "Price Tracker response:",
        response.status,
        responseText
      );


      if (!response.ok) {

        throw new Error(
          responseText ||
          `Failed to track product (${response.status})`
        );

      }


      setTrackedProducts((current) => {

        if (
          current.includes(
            numericDealId
          )
        ) {

          return current;

        }


        return [
          ...current,
          numericDealId
        ];

      });


      alert(
        "Product added to Price Tracker!"
      );

    }

    catch (err) {

      console.error(
        "PRICE TRACKER ERROR:",
        err
      );


      alert(
        `Unable to track this product.\n\n${err.message}`
      );

    }

  };


  // =====================================================
  // OPEN ALERT MODAL
  // =====================================================

  const openAlertModal = (deal) => {

    setAlertDeal(deal);

    setTargetPrice("");

  };


  // =====================================================
  // CLOSE ALERT MODAL
  // =====================================================

  const closeAlertModal = () => {

    if (savingAlert) {
      return;
    }


    setAlertDeal(null);

    setTargetPrice("");

  };


  // =====================================================
  // CREATE PRICE ALERT
  // POST /api/alerts
  // =====================================================

  const createPriceAlert = async () => {

    if (!alertDeal) {
      return;
    }


    const numericTargetPrice =
      Number(targetPrice);


    if (
      !targetPrice ||
      Number.isNaN(numericTargetPrice) ||
      numericTargetPrice <= 0
    ) {

      alert(
        "Please enter a valid target price."
      );

      return;

    }


    try {

      setSavingAlert(true);


      const response = await fetch(
        "http://localhost:8080/api/alerts",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            dealId:
              Number(alertDeal.id),

            userEmail,

            targetPrice:
              numericTargetPrice

          })

        }
      );


      const responseText =
        await response.text();


      console.log(
        "Alert response:",
        response.status,
        responseText
      );


      if (!response.ok) {

        throw new Error(
          responseText ||
          `Failed to create alert (${response.status})`
        );

      }


      alert(
        "Price alert created successfully!"
      );


      closeAlertModal();

    }

    catch (err) {

      console.error(
        "ALERT ERROR:",
        err
      );


      alert(
        `Unable to create price alert.\n\n${err.message}`
      );

    }

    finally {

      setSavingAlert(false);

    }

  };


  // =====================================================
  // FILTER DEALS
  // =====================================================

  let filteredDeals = deals.filter((deal) => {

    const searchText =
      search.toLowerCase();


    const matchesSearch =
      (deal.name || "")
        .toLowerCase()
        .includes(searchText) ||

      (deal.store || "")
        .toLowerCase()
        .includes(searchText);


    const matchesCategory =
      activeCategory === "All" ||
      deal.category === activeCategory;


    const matchesStore =
      activeStore === "All Stores" ||
      deal.store === activeStore;


    return (
      matchesSearch &&
      matchesCategory &&
      matchesStore
    );

  });


  // =====================================================
  // SORT
  // =====================================================

  if (
    sortBy === "Price: Low to High"
  ) {

    filteredDeals.sort(
      (a, b) =>
        parseInt(
          String(a.price || "")
            .replace(/\D/g, "")
        ) -
        parseInt(
          String(b.price || "")
            .replace(/\D/g, "")
        )
    );

  }


  if (
    sortBy === "Price: High to Low"
  ) {

    filteredDeals.sort(
      (a, b) =>
        parseInt(
          String(b.price || "")
            .replace(/\D/g, "")
        ) -
        parseInt(
          String(a.price || "")
            .replace(/\D/g, "")
        )
    );

  }


  if (
    sortBy === "Highest Discount"
  ) {

    filteredDeals.sort(
      (a, b) =>
        parseInt(b.discount || 0) -
        parseInt(a.discount || 0)
    );

  }


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="top-deals-page">

        <div className="no-deals">

          <Flame size={35} />

          <h3>
            Loading deals...
          </h3>

          <p>
            Getting the latest deals from SaleBoomer.
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

      <section className="top-deals-page">

        <div className="no-deals">

          <Search size={35} />

          <h3>
            {error}
          </h3>

          <p>
            Make sure your Spring Boot backend is running.
          </p>

        </div>

      </section>

    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <section className="top-deals-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="top-deals-page-header">

        <div>

          <div className="page-eyebrow">

            <Flame size={14} />

            HOT DEALS

          </div>


          <h1>
            Top Deals
          </h1>


          <p>
            Discover the best discounts and offers
            available right now.
          </p>

        </div>


        <div className="deals-count-card">

          <Flame size={22} />

          <div>

            <strong>
              {filteredDeals.length}
            </strong>

            <span>
              Deals Available
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          SEARCH + SORT
      ================================================= */}

      <div className="deals-toolbar">

        <div className="deals-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search deals, products or stores..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="deals-sort">

          <ArrowDownUp size={16} />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option>
              Featured
            </option>

            <option>
              Highest Discount
            </option>

            <option>
              Price: Low to High
            </option>

            <option>
              Price: High to Low
            </option>

          </select>

        </div>

      </div>


      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="deals-filters">

        <div className="category-filters">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >

              {category}

            </button>

          ))}

        </div>


        <div className="store-filter">

          <SlidersHorizontal size={15} />

          <select
            value={activeStore}
            onChange={(e) =>
              setActiveStore(e.target.value)
            }
          >

            {stores.map((store) => (

              <option
                key={store}
                value={store}
              >

                {store}

              </option>

            ))}

          </select>

        </div>

      </div>


      {/* =================================================
          PRODUCTS
      ================================================= */}

      {filteredDeals.length > 0 ? (

        <div className="top-deals-products">

          {filteredDeals.map((deal) => (

            <article
              className="deal-product-card"
              key={deal.id}
            >


              {/* PRODUCT IMAGE */}

              <div className="deal-product-image">

                <img
                  src={deal.image}
                  alt={deal.name}
                />


                <span className="deal-discount">

                  {deal.discount}

                </span>


                {/* WATCHLIST */}

                <button
                  type="button"
                  className={`deal-wishlist ${
                    wishlist.includes(
                      Number(deal.id)
                    )
                      ? "wishlist-active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleWishlist(deal.id)
                  }
                  disabled={loadingWishlist}
                  aria-label={
                    wishlist.includes(
                      Number(deal.id)
                    )
                      ? "Remove from watchlist"
                      : "Add to watchlist"
                  }
                  title={
                    wishlist.includes(
                      Number(deal.id)
                    )
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"
                  }
                >

                  <Heart
                    size={17}
                    fill={
                      wishlist.includes(
                        Number(deal.id)
                      )
                        ? "currentColor"
                        : "none"
                    }
                  />

                </button>

              </div>


              {/* PRODUCT INFORMATION */}

              <div className="deal-product-info">


                {/* STORE */}

                <div className="deal-product-store">

                  <span
                    className={`deal-store-logo ${
                      deal.storeClass
                    }`}
                  >

                    {deal.storeLetter}

                  </span>

                  <span>
                    {deal.store}
                  </span>

                </div>


                {/* NAME */}

                <h3>
                  {deal.name}
                </h3>


                {/* RATING */}

                <div className="deal-rating">

                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  <strong>
                    {deal.rating}
                  </strong>

                  <span>
                    ({deal.reviews})
                  </span>

                </div>


                {/* PRICE */}

                <div className="deal-price">

                  <strong>
                    {deal.price}
                  </strong>

                  <del>
                    {deal.oldPrice}
                  </del>

                </div>


                {/* ACTIONS */}

                <div className="deal-actions">


                  {/* VIEW DEAL */}

                  <button
                    type="button"
                    className="deal-view-button"
                  >

                    View Deal

                    <ExternalLink size={13} />

                  </button>


                  {/* PRICE TRACKER */}

                  <button
                    type="button"
                    className="deal-track-button"
                    onClick={() =>
                      trackPrice(deal)
                    }
                    disabled={
                      loadingTracker ||
                      trackedProducts.includes(
                        Number(deal.id)
                      )
                    }
                    title={
                      trackedProducts.includes(
                        Number(deal.id)
                      )
                        ? "Already tracking"
                        : "Track Price"
                    }
                  >

                    <TrendingUp size={15} />

                    {trackedProducts.includes(
                      Number(deal.id)
                    )
                      ? "Tracking"
                      : "Track Price"
                    }

                  </button>


                  {/* PRICE ALERT */}

                  <button
                    type="button"
                    className="deal-alert-button"
                    onClick={() =>
                      openAlertModal(deal)
                    }
                    title="Set Price Alert"
                  >

                    <Bell size={15} />

                    Alert

                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      ) : (

        <div className="no-deals">

          <Search size={35} />

          <h3>
            No deals found
          </h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>

      )}


      {/* =================================================
          PRICE ALERT MODAL
      ================================================= */}

      {alertDeal && (

        <div
          className="alert-modal-overlay"
          onClick={closeAlertModal}
        >

          <div
            className="alert-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="alert-modal-header">

              <div>

                <div className="alert-modal-icon">

                  <Bell size={20} />

                </div>

                <div>

                  <h2>
                    Set Price Alert
                  </h2>

                  <p>
                    We'll notify you when the price reaches your target.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="alert-modal-close"
                onClick={closeAlertModal}
                disabled={savingAlert}
              >

                <X size={18} />

              </button>

            </div>


            {/* PRODUCT */}

            <div className="alert-modal-product">

              <img
                src={alertDeal.image}
                alt={alertDeal.name}
              />

              <div>

                <span>
                  {alertDeal.store}
                </span>

                <h3>
                  {alertDeal.name}
                </h3>

                <strong>
                  Current price: {alertDeal.price}
                </strong>

              </div>

            </div>


            {/* TARGET PRICE */}

            <label className="alert-target-label">

              Target Price

              <div className="alert-input-wrapper">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter target price"
                  value={targetPrice}
                  onChange={(e) =>
                    setTargetPrice(
                      e.target.value
                    )
                  }
                  autoFocus
                />

              </div>

            </label>


            <p className="alert-modal-hint">

              Example: Enter <strong>4500</strong> if you
              want an alert when the price reaches ₹4,500.

            </p>


            {/* BUTTONS */}

            <div className="alert-modal-actions">

              <button
                type="button"
                className="alert-cancel-button"
                onClick={closeAlertModal}
                disabled={savingAlert}
              >

                Cancel

              </button>


              <button
                type="button"
                className="alert-confirm-button"
                onClick={createPriceAlert}
                disabled={
                  savingAlert ||
                  !targetPrice
                }
              >

                <Bell size={15} />

                {savingAlert
                  ? "Saving..."
                  : "Set Alert"
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}


export default TopDealsPage;