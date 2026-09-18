import React from "react";
import {
  Search,
  Flame,
  Heart,
  Bell,
  User,
  ChevronDown
} from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">

      {/* Mobile Menu */}
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
      >
        ☰
      </button>


      {/* Search */}
      <div className="navbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search products, brands & stores..."
        />

        <span className="search-shortcut">
          Ctrl K
        </span>

      </div>


      {/* Right Side */}
      <div className="navbar-actions">

        {/* Deals */}
        <button className="navbar-action deals-button">

          <Flame size={18} />

          <span>
            Deals
          </span>

        </button>


        {/* Watchlist */}
        <button className="navbar-icon-button">

          <Heart size={19} />

          <span className="notification-dot">
            2
          </span>

        </button>


        {/* Notifications */}
        <button className="navbar-icon-button">

          <Bell size={19} />

          <span className="notification-dot">
            3
          </span>

        </button>


        {/* Divider */}
        <div className="navbar-divider" />


        {/* Profile */}
        <button className="navbar-profile">

          <div className="profile-avatar">
            R
          </div>

          <div className="profile-info">

            <span className="profile-name">
              Rajni
            </span>

            <span className="profile-role">
              Deal Hunter
            </span>

          </div>

          <ChevronDown size={15} />

        </button>

      </div>

    </header>
  );
}

export default Navbar;