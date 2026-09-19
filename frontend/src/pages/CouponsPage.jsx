import React, { useMemo, useState } from "react";

import {
  Tag,
  Sparkles,
  Search,
  Clock3,
  Copy,
  Check
} from "lucide-react";


const coupons = [
  {
    id: 1,
    store: "Amazon",
    logo: "A",
    className: "coupon-amazon",
    offer: "₹500 OFF",
    description:
      "Get ₹500 off on selected electronics and gadgets.",
    expiry: "Expires in 2 days",
    code: "AMZ500",
    category: "Electronics"
  },

  {
    id: 2,
    store: "Myntra",
    logo: "M",
    className: "coupon-myntra",
    offer: "30% OFF",
    description:
      "Flat 30% off on fashion, footwear and accessories.",
    expiry: "Expires in 5 days",
    code: "MYNTRA30",
    category: "Fashion"
  },

  {
    id: 3,
    store: "Flipkart",
    logo: "F",
    className: "coupon-flipkart",
    offer: "₹1000 OFF",
    description:
      "Save ₹1000 on selected products and electronics.",
    expiry: "Expires in 3 days",
    code: "FLIP1000",
    category: "Electronics"
  },

  {
    id: 4,
    store: "Nykaa",
    logo: "N",
    className: "coupon-nykaa",
    offer: "25% OFF",
    description:
      "Get 25% off on beauty, skincare and makeup products.",
    expiry: "Expires in 4 days",
    code: "NYKAA25",
    category: "Beauty"
  }
];


const filters = [
  "All",
  "Fashion",
  "Electronics",
  "Beauty"
];


function CouponsPage() {

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedCode, setCopiedCode] = useState(null);


  /* =========================================
     FILTER COUPONS
  ========================================= */

  const filteredCoupons = useMemo(() => {

    return coupons.filter((coupon) => {

      const matchesCategory =
        activeFilter === "All" ||
        coupon.category === activeFilter;


      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        coupon.store.toLowerCase().includes(searchText) ||
        coupon.code.toLowerCase().includes(searchText) ||
        coupon.offer.toLowerCase().includes(searchText) ||
        coupon.description.toLowerCase().includes(searchText);


      return matchesCategory && matchesSearch;

    });

  }, [search, activeFilter]);


  /* =========================================
     COPY COUPON
  ========================================= */

  const handleCopy = async (code) => {

    try {

      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);

    } catch (error) {

      console.log("Unable to copy coupon code");

    }

  };


  return (

    <div className="coupons-page">


      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="coupons-page-header">

        <div className="coupons-header-content">

          <div className="coupons-eyebrow">

            <Tag size={14} />

            <span>
              EXCLUSIVE OFFERS
            </span>

          </div>


          <h1>
            Coupons & Offers

            <span className="coupon-title-icon">
              🎟️
            </span>
          </h1>


          <p>
            Save more with the latest coupon codes and
            exclusive offers from your favorite stores.
          </p>

        </div>


        {/* =================================
            ACTIVE COUPONS CARD
        ================================= */}

        <div className="active-coupons-card">

          <div className="active-coupons-icon">

            <Sparkles size={25} />

          </div>


          <div>

            <strong>
              {coupons.length}+
            </strong>

            <span>
              Active Coupons
            </span>

          </div>

        </div>

      </section>



      {/* =====================================
          SEARCH + FILTERS
      ===================================== */}

      <section className="coupons-toolbar">


        {/* SEARCH */}

        <div className="coupons-search">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search coupons, stores or codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* FILTERS */}

        <div className="coupon-filters">

          {filters.map((filter) => (

            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "coupon-filter active"
                  : "coupon-filter"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>

          ))}

        </div>

      </section>



      {/* =====================================
          COUPON GRID
      ===================================== */}

      <section className="coupons-page-grid">

        {filteredCoupons.length > 0 ? (

          filteredCoupons.map((coupon) => (

            <article
              key={coupon.id}
              className={`coupon-page-card ${coupon.className}`}
            >


              {/* DECORATIVE CIRCLE */}

              <div className="coupon-decoration" />


              {/* =================================
                  STORE
              ================================= */}

              <div className="coupon-page-store">

                <div className="coupon-page-logo">

                  {coupon.logo}

                </div>

                <strong>
                  {coupon.store}
                </strong>

              </div>


              {/* =================================
                  OFFER
              ================================= */}

              <div className="coupon-page-content">

                <span className="coupon-special">
                  SPECIAL OFFER
                </span>

                <h2>
                  {coupon.offer}
                </h2>

                <p>
                  {coupon.description}
                </p>


                {/* EXPIRY */}

                <div className="coupon-expiry">

                  <Clock3 size={15} />

                  <span>
                    {coupon.expiry}
                  </span>

                </div>

              </div>


              {/* =================================
                  BOTTOM
              ================================= */}

              <div className="coupon-page-bottom">


                <div className="coupon-code-wrapper">

                  <span>
                    CODE
                  </span>

                  <strong>
                    {coupon.code}
                  </strong>

                </div>


                <button
                  className="coupon-copy-button"
                  onClick={() =>
                    handleCopy(coupon.code)
                  }
                >

                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Code
                    </>
                  )}

                </button>


              </div>


            </article>

          ))

        ) : (

          /* =================================
             NO RESULTS
          ================================= */

          <div className="no-coupons">

            <Search size={35} />

            <h3>
              No coupons found
            </h3>

            <p>
              Try another store, category or coupon code.
            </p>

          </div>

        )}

      </section>


    </div>

  );

}


export default CouponsPage;