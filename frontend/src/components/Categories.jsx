import React from "react";
import {
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  Footprints,
  Dumbbell,
  ShoppingCart,
  Gamepad2,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    name: "Fashion",
    deals: "1,200+ Deals",
    icon: Shirt,
    className: "fashion"
  },
  {
    name: "Electronics",
    deals: "850+ Deals",
    icon: Smartphone,
    className: "electronics"
  },
  {
    name: "Beauty",
    deals: "620+ Deals",
    icon: Sparkles,
    className: "beauty"
  },
  {
    name: "Home",
    deals: "430+ Deals",
    icon: Home,
    className: "home"
  },
  {
    name: "Shoes",
    deals: "540+ Deals",
    icon: Footprints,
    className: "shoes"
  },
  {
    name: "Sports",
    deals: "310+ Deals",
    icon: Dumbbell,
    className: "sports"
  },
  {
    name: "Grocery",
    deals: "780+ Deals",
    icon: ShoppingCart,
    className: "grocery"
  },
  {
    name: "Gaming",
    deals: "250+ Deals",
    icon: Gamepad2,
    className: "gaming"
  }
];

function Categories() {
  return (
    <section className="categories-section">

      {/* Heading */}
      <div className="section-heading">

        <div>
          <span className="section-label">
            EXPLORE
          </span>

          <h2>
            Shop by Category
          </h2>

          <p>
            Find the best deals across all categories
          </p>
        </div>

        <button className="view-all-button">
          View All
          <ArrowRight size={15} />
        </button>

      </div>


      {/* Category Grid */}
      <div className="categories-grid">

        {categories.map((category) => {

          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className={`category-card ${category.className}`}
            >

              <div className="category-icon">
                <Icon size={25} />
              </div>

              <div className="category-info">

                <h3>
                  {category.name}
                </h3>

                <span>
                  {category.deals}
                </span>

              </div>

              <ArrowRight
                className="category-arrow"
                size={17}
              />

            </button>
          );

        })}

      </div>

    </section>
  );
}

export default Categories;