import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import CouponsPage from "./pages/CouponsPage";
import TopDealsPage from "./pages/TopDealsPage";
import AllStoresPage from "./pages/AllStoresPage";
import CategoriesPage from "./pages/CategoriesPage";
import PriceTrackerPage from "./pages/PriceTrackerPage";
import WatchlistPage from "./pages/WatchlistPage";
import AlertsPage from "./pages/AlertsPage";
import RecentlyViewedPage from "./pages/RecentlyViewedPage";


function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <BrowserRouter>

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dashboard-content">

        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />


        {/* =========================
            ROUTES
        ========================= */}

        <Routes>

          {/* Dashboard */}

          <Route
            path="/"
            element={<Dashboard />}
          />


          {/* Top Deals */}

          <Route
            path="/top-deals"
            element={<TopDealsPage />}
          />


          {/* All Stores */}

          <Route
            path="/all-stores"
            element={<AllStoresPage />}
          />


          {/* Categories */}

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />


          {/* Price Tracker */}

          <Route
            path="/price-tracker"
            element={<PriceTrackerPage />}
          />


          {/* Watchlist */}

          <Route
            path="/watchlist"
            element={<WatchlistPage />}
          />


          {/* Coupons */}

          <Route
            path="/coupons"
            element={<CouponsPage />}
          />

          <Route
            path="/alerts"
            element={<AlertsPage />}
          />

          <Route
  path="/recently-viewed"
  element={<RecentlyViewedPage />}
/>

        </Routes>

      </main>

    </BrowserRouter>

  );
}


export default App;