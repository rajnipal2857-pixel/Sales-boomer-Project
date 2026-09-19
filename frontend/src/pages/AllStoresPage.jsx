
import React, { useEffect, useState } from "react";

import {
  ExternalLink,
  Store,
  Search
} from "lucide-react";


function AllStoresPage() {

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // GET STORES FROM BACKEND
  // =========================

  useEffect(() => {

    fetch("http://localhost:8080/api/stores")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }

        return response.json();

      })

      .then((data) => {

        setStores(data);
        setLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setError(
          "Unable to connect to SaleBoomer backend."
        );

        setLoading(false);

      });

  }, []);


  // =========================
  // FILTER STORES
  // =========================

  const filteredStores = stores.filter((store) =>
    store.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  // =========================
  // STORE CLASS
  // =========================

  const getStoreClass = (name) => {

    return `store-${name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="stores-page">

        <div className="page-header">

          <div>

            <div className="section-label">
              SHOPPING STORES
            </div>

            <h1>
              All Stores
            </h1>

            <p>
              Loading stores from SaleBoomer backend...
            </p>

          </div>

        </div>


        <div className="stores-loading">
          Loading stores...
        </div>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <div className="stores-page">

        <div className="page-header">

          <div>

            <div className="section-label">
              SHOPPING STORES
            </div>

            <h1>
              All Stores
            </h1>

            <p>
              Explore all shopping stores available
              on SaleBoomer.
            </p>

          </div>

        </div>


        <div className="stores-error">

          <h3>
            Backend Connection Failed
          </h3>

          <p>
            {error}
          </p>

          <p>
            Please make sure your Spring Boot
            backend is running on port 8080.
          </p>

        </div>

      </div>

    );

  }


  return (

    <div className="stores-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="page-header">

        <div>

          <div className="section-label">
            SHOPPING STORES
          </div>

          <h1>
            All Stores
          </h1>

          <p>
            Explore all shopping stores available
            on SaleBoomer.
          </p>

        </div>


        <div className="store-count">

          <Store size={17} />

          <span>
            {stores.length} Stores
          </span>

        </div>

      </section>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="stores-search">

        <Search size={17} />

        <input
          type="text"
          placeholder="Search stores..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =========================
          STORE GRID
      ========================= */}

      <section className="stores-section">

        <div className="stores-grid">

          {filteredStores.map((store) => (

            <article
              key={store.id}
              className={`store-deal-card ${getStoreClass(
                store.name
              )}`}
            >

              {/* STORE ICON */}

              <div className="large-store-icon">

                {store.name?.charAt(0)}

              </div>


              {/* STORE INFORMATION */}

              <div className="store-deal-info">

                <h3>
                  {store.name}
                </h3>

                <p>
                  {store.description}
                </p>


                {/* STATS */}

                <div className="store-deal-stats">

  <div>

    <strong>
      {store.deals ?? 0}
    </strong>

    <span>
      Deals
    </span>

  </div>

  <div>

    <strong>
      {store.discount ?? "—"}
    </strong>

    <span>
      Discount
    </span>

  </div>

</div>


                {/* BUTTON */}

                <button
                  className="explore-store-button"
                  onClick={() => {

                    alert(
                      `Opening ${store.name}`
                    );

                  }}
                >

                  Explore Store

                  <ExternalLink size={12} />

                </button>

              </div>

            </article>

          ))}

        </div>


        {/* EMPTY SEARCH */}

        {filteredStores.length === 0 && (

          <div className="stores-empty">

            <Store size={30} />

            <h3>
              No stores found
            </h3>

            <p>
              Try another store name.
            </p>

          </div>

        )}

      </section>

    </div>

  );

}


export default AllStoresPage;
