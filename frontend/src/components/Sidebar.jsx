import React from "react";

import {
  Home,
  Flame,
  ShoppingBag,
  LayoutGrid,
  Clock3,
  Heart,
  Tag,
  Bell,
  History,
  Sparkles,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";


// =====================================================
// TOP STORES
// =====================================================

const stores = [
  { name: "Myntra", className: "myntra" },
  { name: "Amazon", className: "amazon" },
  { name: "Flipkart", className: "flipkart" },
  { name: "AJIO", className: "ajio" },
  { name: "Nykaa", className: "nykaa" }
];


// =====================================================
// SIDEBAR MENU
// =====================================================

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    path: "/"
  },

  {
    name: "Top Deals",
    icon: Flame,
    path: "/top-deals"
  },

  {
    name: "All Stores",
    icon: ShoppingBag,
    path: "/all-stores"
  },

  {
    name: "Categories",
    icon: LayoutGrid,
     path: "/categories"
  },

  {
    name: "Price Tracker",
    icon: Clock3,
    path: "/price-tracker"
  },

  {
    name: "Watchlist",
    icon: Heart,
     path: "/watchlist"
  },

  {
    name: "Coupons",
    icon: Tag,
    path: "/coupons"
  },

  {
    name: "Alerts",
    icon: Bell,
    path: "/alerts"
  },

  {
    name: "Recently Viewed",
    icon: History,
    path: "/recently-viewed"
  }
];


// =====================================================
// SIDEBAR COMPONENT
// =====================================================

function Sidebar({ isOpen, setIsOpen }) {

  return (

    <aside
      className={`sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="sidebar-brand">

        <div className="logo">
          Sale<span>Boomer</span>
          <sup>*</sup>
        </div>

        <p>
          All Sales. One Place.
        </p>

      </div>


      {/* =================================================
          CLOSE BUTTON
      ================================================= */}

      <button
        className="sidebar-close"
        onClick={() => setIsOpen(false)}
        aria-label="Close sidebar"
      >
        <X size={20} />
      </button>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="sidebar-navigation">

        {menuItems.map((item) => {

          const Icon = item.icon;


          // =================================================
          // DISABLED ITEMS
          // =================================================

          if (!item.path) {

            return (

              <div
                key={item.name}
                className="sidebar-item sidebar-item-disabled"
              >

                <Icon size={18} />

                <span>
                  {item.name}
                </span>


                {/* Watchlist Badge */}

                {item.name === "Watchlist" && (

                  <span className="menu-badge">
                    0
                  </span>

                )}


                {/* Alerts Badge */}

                {item.name === "Alerts" && (

                  <span className="menu-badge">
                    3
                  </span>

                )}

              </div>

            );

          }


          // =================================================
          // ACTIVE ROUTES
          // =================================================

          return (

            <NavLink
              key={item.name}

              to={item.path}

              className={({ isActive }) =>
                `sidebar-item ${
                  isActive
                    ? "sidebar-item-active"
                    : ""
                }`
              }

              onClick={() => {

                if (window.innerWidth <= 768) {
                  setIsOpen(false);
                }

              }}
            >

              <Icon size={18} />

              <span>
                {item.name}
              </span>


              {/* Watchlist Badge */}

              {item.name === "Watchlist" && (

                <span className="menu-badge">
                  0
                </span>

              )}


              {/* Alerts Badge */}

              {item.name === "Alerts" && (

                <span className="menu-badge">
                  3
                </span>

              )}

            </NavLink>

          );

        })}

      </nav>


      {/* =================================================
          TOP STORES
      ================================================= */}

      <div className="sidebar-stores">

        <p className="sidebar-heading">
          TOP STORES
        </p>


        {stores.map((store) => (

          <button
            key={store.name}
            className="store-menu-item"
          >

            <span
              className={`store-icon ${store.className}`}
            >
              {store.name.charAt(0)}
            </span>

            <span>
              {store.name}
            </span>

          </button>

        ))}

      </div>


      {/* =================================================
          ALERT CARD
      ================================================= */}

      <div className="sidebar-alert">

        <Sparkles size={20} />

        <h3>
          Never miss a deal!
        </h3>

        <p>
          Enable alerts and get notified
          about the best offers.
        </p>


        <button className="enable-alert">

          <Bell size={15} />

          Enable Alerts

        </button>

      </div>

    </aside>

  );

}


export default Sidebar;