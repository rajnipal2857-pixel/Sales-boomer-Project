
import React, { useEffect, useState } from "react";

import {
  Bell,
  BellRing,
  TrendingDown,
  Trash2,
  Check,
  Settings,
  Clock3,
  Search
} from "lucide-react";


function AlertsPage() {

  /* =====================================================
     USER
  ===================================================== */

  const userEmail = "test@gmail.com";


  /* =====================================================
     STATES
  ===================================================== */

  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =====================================================
     FETCH ALERTS FROM BACKEND
  ===================================================== */

  useEffect(() => {

    const loadAlerts = async () => {

      try {

        setLoading(true);
        setError("");


        const response = await fetch(
          `http://localhost:8080/api/alerts/${encodeURIComponent(
            userEmail
          )}`
        );


        if (!response.ok) {

          throw new Error(
            "Failed to fetch alerts"
          );

        }


        const data = await response.json();


        console.log(
          "Alerts from backend:",
          data
        );


        /*
          Backend currently returns:
          id
          dealId
          userEmail
          targetPrice
          status
          store
          storeClass
          product
          image
          price
          oldPrice
          discount
          rating
          reviews
        */


        const formattedAlerts = data.map(
          (alert) => {

            /*
              Convert backend alert into
              the format used by this page.
            */

            const currentPrice =
              parsePrice(alert.price);

            const targetPrice =
              Number(alert.targetPrice);


            /*
              Determine whether target price
              has been reached.
            */

            const triggered =
              currentPrice !== null &&
              targetPrice !== null &&
              currentPrice <= targetPrice;


            return {

              id: alert.id,

              dealId: alert.dealId,

              product: alert.product,

              store: alert.store,

              storeClass:
                alert.storeClass,

              image: alert.image,

              currentPrice:
                alert.price,

              oldPrice:
                alert.oldPrice,

              targetPrice:
                alert.targetPrice,

              discount:
                alert.discount,

              rating:
                alert.rating,

              reviews:
                alert.reviews,

              status:
                triggered
                  ? "TRIGGERED"
                  : alert.status,

              type: "price",

              unread:
                triggered

            };

          }
        );


        setAlerts(formattedAlerts);

      }

      catch (err) {

        console.error(
          "Alerts error:",
          err
        );


        setError(
          "Unable to load your alerts."
        );

      }

      finally {

        setLoading(false);

      }

    };


    loadAlerts();

  }, []);


  /* =====================================================
     CONVERT PRICE STRING TO NUMBER
  ===================================================== */

  const parsePrice = (price) => {

    if (!price) {
      return null;
    }


    const number =
      Number(
        String(price)
          .replace(/[^\d.]/g, "")
      );


    return Number.isNaN(number)
      ? null
      : number;

  };


  /* =====================================================
     UNREAD COUNT
  ===================================================== */

  const unreadCount =
    alerts.filter(
      (alert) => alert.unread
    ).length;


  /* =====================================================
     MARK ALL READ
     
     This is currently frontend-only because
     AlertController does not have a mark-read endpoint.
  ===================================================== */

  const markAllRead = () => {

    setAlerts(
      (current) =>
        current.map(
          (alert) => ({
            ...alert,
            unread: false
          })
        )
    );

  };


  /* =====================================================
     DELETE ALERT
     DELETE /api/alerts/{alertId}
  ===================================================== */

  const deleteAlert = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/alerts/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to delete alert"
        );

      }


      /*
        Remove immediately from UI
        after successful deletion.
      */

      setAlerts(
        (current) =>
          current.filter(
            (alert) =>
              alert.id !== id
          )
      );

    }

    catch (err) {

      console.error(
        "Delete alert error:",
        err
      );


      alert(
        "Unable to delete this alert."
      );

    }

  };


  /* =====================================================
     ICON
  ===================================================== */

  const getIcon = (type) => {

    if (type === "price") {

      return (
        <TrendingDown size={19} />
      );

    }


    return (
      <BellRing size={19} />
    );

  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <section className="alerts-page">

        <div className="alerts-empty">

          <Bell size={40} />

          <h2>
            Loading your Alerts...
          </h2>

          <p>
            Getting your latest price alerts.
          </p>

        </div>

      </section>

    );

  }


  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {

    return (

      <section className="alerts-page">

        <div className="alerts-empty">

          <Search size={40} />

          <h2>
            {error}
          </h2>

          <p>
            Make sure your Spring Boot backend
            is running.
          </p>

        </div>

      </section>

    );

  }


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <section className="alerts-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="alerts-header">

        <div>

          <div className="section-label">

            NOTIFICATIONS

          </div>


          <h1>
            Your Alerts
          </h1>


          <p>
            Stay updated when your watched
            products reach your target price.
          </p>

        </div>


        <div className="alerts-header-actions">

          <button
            className="alert-settings-button"
            onClick={() =>
              alert(
                "Alert settings will be available soon."
              )
            }
          >

            <Settings size={16} />

            Settings

          </button>


          {unreadCount > 0 && (

            <button
              className="mark-read-button"
              onClick={markAllRead}
            >

              <Check size={16} />

              Mark all as read

            </button>

          )}

        </div>

      </div>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="alerts-summary">


        {/* TOTAL */}

        <div className="alert-summary-card">

          <div className="alert-summary-icon purple">

            <Bell size={20} />

          </div>


          <div>

            <strong>
              {alerts.length}
            </strong>

            <span>
              Total Alerts
            </span>

          </div>

        </div>


        {/* UNREAD */}

        <div className="alert-summary-card">

          <div className="alert-summary-icon orange">

            <BellRing size={20} />

          </div>


          <div>

            <strong>
              {unreadCount}
            </strong>

            <span>
              Unread
            </span>

          </div>

        </div>


        {/* TRIGGERED */}

        <div className="alert-summary-card">

          <div className="alert-summary-icon green">

            <TrendingDown size={20} />

          </div>


          <div>

            <strong>
              {
                alerts.filter(
                  (alert) =>
                    alert.status ===
                    "TRIGGERED"
                ).length
              }
            </strong>

            <span>
              Price Reached
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          ALERT LIST
      ================================================= */}

      <div className="alerts-list">


        {/* HEADER */}

        <div className="alerts-list-header">

          <div>

            <h2>
              Price Alerts
            </h2>

            <p>
              Products you're monitoring
            </p>

          </div>


          <span className="alert-count">

            {alerts.length} alerts

          </span>

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {alerts.length === 0 ? (

          <div className="alerts-empty">

            <div className="empty-alert-icon">

              <Bell size={30} />

            </div>


            <h3>
              No alerts yet
            </h3>


            <p>
              Set a target price on a deal
              and we'll show it here.
            </p>

          </div>

        ) : (


          /* =================================================
             ALERT ITEMS
          ================================================= */

          alerts.map(
            (alertItem) => (

              <div
                key={alertItem.id}
                className={`alert-item ${
                  alertItem.unread
                    ? "alert-unread"
                    : ""
                }`}
              >


                {/* ICON */}

                <div
                  className={`alert-icon alert-price`}
                >

                  {getIcon("price")}

                </div>


                {/* CONTENT */}

                <div className="alert-content">


                  {/* TITLE */}

                  <div className="alert-title-row">

                    <h3>

                      {alertItem.status ===
                      "TRIGGERED"
                        ? "Price Target Reached"
                        : "Price Alert"
                      }

                    </h3>


                    {alertItem.unread && (

                      <span
                        className="unread-dot"
                      ></span>

                    )}

                  </div>


                  {/* STORE */}

                  <strong>

                    {alertItem.store}

                  </strong>


                  {/* PRODUCT */}

                  <p>

                    {alertItem.product}

                  </p>


                  {/* PRICE INFORMATION */}

                  <div className="alert-price">


                    {alertItem.oldPrice && (

                      <del>
                        {alertItem.oldPrice}
                      </del>

                    )}


                    <strong>
                      {alertItem.currentPrice}
                    </strong>


                    {alertItem.discount && (

                      <span>
                        {alertItem.discount}
                      </span>

                    )}

                  </div>


                  {/* TARGET PRICE */}

                  <div className="alert-target-price">

                    Target price:

                    <strong>
                      ₹
                      {Number(
                        alertItem.targetPrice
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>


                  {/* STATUS */}

                  <div className="alert-time">

                    <Clock3 size={12} />

                    {alertItem.status ===
                    "TRIGGERED"
                      ? "Target price reached"
                      : "Alert is active"
                    }

                  </div>

                </div>


                {/* DELETE */}

                <button
                  className="delete-alert-button"
                  onClick={() =>
                    deleteAlert(
                      alertItem.id
                    )
                  }
                  title="Delete alert"
                  aria-label="Delete alert"
                >

                  <Trash2 size={16} />

                </button>

              </div>

            )
          )

        )}

      </div>

    </section>

  );

}


export default AlertsPage;
