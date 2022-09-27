import axios from "axios";
import { useEffect, useState } from "react";


import ProductCard from "../components/ProductCard";
import "../styles/pages/home.scss";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") //hayq eu cambiar la api por la de fakestore api
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="homeContainer">
      <h1 className="homeHeader">{loading ? null : "Products"}</h1>
      <div className="productContainer">
        {loading ? (
          <p>Loading</p>
        ) : (
          items.map((item) => {
            return (
              <div className="product" key={item.id}>
                <ProductCard item={item} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
