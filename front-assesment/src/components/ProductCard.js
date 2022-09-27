import "../styles/components/productCard.scss";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import { useState } from "react";

const ProductCard = ({ item }) => {
  const [linkNav, setLinkNav] = useState("");
  const randomNumber = Math.floor(Math.random() * 3 + 1);

  let time = 0;
  if (randomNumber === 1) {
    time = 60;
  } else if (randomNumber === 2) {
    time = 120;
  } else {
    time = 180;
  }
  //hay que cambiar intem.name por item.title
  return (
    <div className="productCard">
      <Link className={linkNav} to={`/productDetail/${item.id}`}>
        <img className="productImg" src={item.image} alt={"cargando"}></img>

        <div className="productTitle">{item.title}</div>
        <CountDown count={time} setLinkNav={setLinkNav}></CountDown>
      </Link>
    </div>
  );
};

export default ProductCard;
