import React from "react";

import {
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  Footprints,
  Dumbbell,
  ShoppingBasket,
  Gamepad2,
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";


const categories = [
  {
    name: "Fashion",
    description: "Clothing, accessories & more",
    deals: "2,450+ deals",
    className: "fashion",
    icon: Shirt
  },
  {
    name: "Electronics",
    description: "Mobiles, laptops & gadgets",
    deals: "1,820+ deals",
    className: "electronics",
    icon: Smartphone
  },
  {
    name: "Beauty",
    description: "Makeup, skincare & personal care",
    deals: "1,240+ deals",
    className: "beauty",
    icon: Sparkles
  },
  {
    name: "Home & Living",
    description: "Furniture, decor & appliances",
    deals: "980+ deals",
    className: "home",
    icon: Home
  },
  {
    name: "Footwear",
    description: "Shoes, sneakers & sandals",
    deals: "760+ deals",
    className: "shoes",
    icon: Footprints
  },
  {
    name: "Sports & Fitness",
    description: "Fitness gear & sportswear",
    deals: "540+ deals",
    className: "sports",
    icon: Dumbbell
  },
  {
    name: "Grocery",
    description: "Food, beverages & essentials",
    deals: "1,560+ deals",
    className: "grocery",
    icon: ShoppingBasket
  },
  {
    name: "Gaming",
    description: "Games, consoles & accessories",
    deals: "430+ deals",
    className: "gaming",
    icon: Gamepad2
  }
];


function CategoriesPage() {

  return (
    <div className="categories-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="page-header">

        <div>

          <div className="page-label">
            EXPLORE
          </div>

          <h1>
            Shop by Category
          </h1>

          <p>
            Find the best deals across all your
            favourite categories.
          </p>

        </div>

      </section>


      {/* =========================
          CATEGORY GRID
      ========================= */}

      <section className="categories-page-section">

        <div className="categories-page-grid">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className={`category-page-card ${category.className}`}
              >

                {/* Icon */}

                <div className="category-page-icon">
                  <Icon size={28} />
                </div>


                {/* Content */}

                <div className="category-page-content">

                  <h2>
                    {category.name}
                  </h2>

                  <p>
                    {category.description}
                  </p>

                  <span className="category-deals">
                    <Tag size={12} />
                    {category.deals}
                  </span>

                </div>


                {/* Arrow */}

                <div className="category-page-arrow">
                  <ArrowRight size={18} />
                </div>

              </button>
            );

          })}

        </div>

      </section>


      {/* =========================
          TRENDING CATEGORIES
      ========================= */}

      <section className="trending-categories">

        <div className="section-heading">

          <div>

            <div className="section-label">
              TRENDING NOW
            </div>

            <h2>
              Popular Categories
            </h2>

            <p>
              Categories shoppers are exploring today
            </p>

          </div>

        </div>


        <div className="trending-category-card">

          <TrendingUp size={20} />

          <div>
            <strong>
              Electronics
            </strong>

            <span>
              32% more searches this week
            </span>
          </div>

          <ArrowRight size={17} />

        </div>


        <div className="trending-category-card">

          <TrendingUp size={20} />

          <div>
            <strong>
              Fashion
            </strong>

            <span>
              24% more searches this week
            </span>
          </div>

          <ArrowRight size={17} />

        </div>


        <div className="trending-category-card">

          <TrendingUp size={20} />

          <div>
            <strong>
              Beauty
            </strong>

            <span>
              18% more searches this week
            </span>
          </div>

          <ArrowRight size={17} />

        </div>

      </section>

    </div>
  );
}


export default CategoriesPage;