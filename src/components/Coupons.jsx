import React, { useState } from "react";
import {
  Tag,
  Copy,
  Check,
  ArrowRight
} from "lucide-react";

const coupons = [
  {
    id: 1,
    store: "Amazon",
    code: "SAVE500",
    title: "₹500 OFF",
    description: "On orders above ₹2,999",
    className: "coupon-amazon"
  },
  {
    id: 2,
    store: "Myntra",
    code: "STYLE20",
    title: "20% OFF",
    description: "On selected fashion items",
    className: "coupon-myntra"
  },
  {
    id: 3,
    store: "Flipkart",
    code: "FLAT300",
    title: "₹300 OFF",
    description: "On orders above ₹1,999",
    className: "coupon-flipkart"
  },
  {
    id: 4,
    store: "Nykaa",
    code: "BEAUTY15",
    title: "15% EXTRA OFF",
    description: "On selected beauty products",
    className: "coupon-nykaa"
  }
];

function Coupons() {

  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = async (code) => {

    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.log("Could not copy coupon:", error);
    }

    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode("");
    }, 2000);
  };


  return (
    <section className="coupons-section">

      {/* =========================
          SECTION HEADING
      ========================= */}

      <div className="section-heading">

        <div>

          <span className="section-label">
            SAVE MORE
          </span>

          <h2 className="coupons-title">

            <Tag size={23} />

            Coupons & Special Offers

          </h2>

          <p>
            Extra savings you can use on your favorite stores
          </p>

        </div>


        <button className="view-all-button">

          View All

          <ArrowRight size={15} />

        </button>

      </div>


      {/* =========================
          COUPONS GRID
      ========================= */}

      <div className="coupons-grid">

        {coupons.map((coupon) => (

          <div
            className={`coupon-card ${coupon.className}`}
            key={coupon.id}
          >

            {/* Left Side */}

            <div className="coupon-main">

              <div className="coupon-store">
                {coupon.store}
              </div>

              <h3>
                {coupon.title}
              </h3>

              <p>
                {coupon.description}
              </p>

            </div>


            {/* Right Side */}

            <div className="coupon-action">

              <div className="coupon-code">
                {coupon.code}
              </div>


              <button
                className="copy-coupon-button"
                onClick={() => handleCopy(coupon.code)}
              >

                {copiedCode === coupon.code ? (
                  <>
                    <Check size={13} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy Code
                  </>
                )}

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Coupons;