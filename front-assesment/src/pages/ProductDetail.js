import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/productDetails.scss";

const ProductDetail = () => {
  let params = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <div className="detailContainer">
      <h1 className="detailHeader">{loading ? null : "Details"}</h1>

      <div className="productDetails">
        {loading ? (
          <p>Loading</p>
        ) : (
          <div>
            <div className="sectionsFlex">
              <h2 className="detailTitle section1">{item.title}</h2>
              <div className="scoreContainer section2">
                <span className="detailRate">
                  Score <u>{item.rating.rate}</u>
                </span>
                <span className="detailCount">
                  Reviews <u>{item.rating.count}</u>
                </span>
              </div>
            </div>
            <img src={item.image} alt={"cargando"} className="detailImg"></img>
            <div className="sectionsFlex">
              <div className="detailPrice section1">
                Price: <b>${item.price}</b>
              </div>
              <div className="detailCategory section2">
                Item category: <b>{item.category}</b>
              </div>
            </div>

            <p className="detailDescription">{item.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
