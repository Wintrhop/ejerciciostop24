import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import "./styles/pages/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navBarContainer">
          <nav className="navBar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/productDetail">Product Detail</Link>
              </li> */}
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/productDetail" element={<ProductDetail />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
