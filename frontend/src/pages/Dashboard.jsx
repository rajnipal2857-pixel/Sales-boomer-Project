import React, { useEffect, useState } from "react";

import HeroBanner from "../components/HeroBanner";
import Categories from "../components/Categories";
import TopDeals from "../components/TopDeals";
import PriceDrops from "../components/PriceDrops";
import StoreDeals from "../components/StoreDeals";

function Dashboard() {

  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:8080/api/test")
      .then((response) => response.text())
      .then((data) => {
        setBackendMessage(data);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
      });

  }, []);

  return (
    <>

      <HeroBanner />

      <Categories />

      <TopDeals />

      <PriceDrops />

      <StoreDeals />

     <div
  style={{
    padding: "20px",
    margin: "30px",
    background: "#e8f5e9",
    color: "#1b5e20",
    borderRadius: "10px",
    fontWeight: "bold"
  }}
>
  {backendMessage || "Connecting to backend..."}
</div>

    </>
  );
}

export default Dashboard;