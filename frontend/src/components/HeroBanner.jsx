import React from "react";
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  Percent
} from "lucide-react";

function HeroBanner() {
  return (
    <section className="hero-banner">

      {/* Left Content */}
      <div className="hero-content">

        <div className="hero-badge">
          <Zap size={14} />
          MEGA SALE IS LIVE
        </div>

        <h1>
          All Your Favorite
          <br />
          <span>Deals. One Place.</span>
        </h1>

        <p>
          Discover the best offers from Myntra,
          Amazon, Flipkart and more — all in one place.
        </p>

        <div className="hero-discount">

          <div className="discount-icon">
            <Percent size={20} />
          </div>

          <div>
            <strong>Up to 80% OFF</strong>
            <span>Limited time offers</span>
          </div>

        </div>

        <button className="hero-button">
          Explore Deals
          <ArrowRight size={17} />
        </button>

      </div>


      {/* Right Visual */}
      <div className="hero-visual">

        {/* Decorative circles */}
        <div className="hero-circle circle-one"></div>
        <div className="hero-circle circle-two"></div>

        {/* Main bag */}
        <div className="hero-bag">
          <ShoppingBag size={75} />
        </div>

        {/* Floating cards */}

        <div className="floating-deal deal-one">
          <span>🔥</span>
          <div>
            <strong>70% OFF</strong>
            <small>Fashion</small>
          </div>
        </div>

        <div className="floating-deal deal-two">
          <span>⚡</span>
          <div>
            <strong>60% OFF</strong>
            <small>Electronics</small>
          </div>
        </div>

        <div className="floating-deal deal-three">
          <span>🛍️</span>
          <div>
            <strong>50% OFF</strong>
            <small>Beauty</small>
          </div>
        </div>

      </div>


      {/* Store Strip */}
      <div className="hero-stores">

        <span>Deals from</span>

        <div className="hero-store">
          <b className="hero-store-logo myntra-logo">M</b>
          Myntra
        </div>

        <div className="hero-store">
          <b className="hero-store-logo amazon-logo">A</b>
          Amazon
        </div>

        <div className="hero-store">
          <b className="hero-store-logo flipkart-logo">F</b>
          Flipkart
        </div>

        <div className="hero-store">
          <b className="hero-store-logo ajio-logo">A</b>
          AJIO
        </div>

        <div className="hero-store">
          <b className="hero-store-logo nykaa-logo">N</b>
          Nykaa
        </div>

      </div>

    </section>
  );
}

export default HeroBanner;