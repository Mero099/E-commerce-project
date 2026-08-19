import "bootstrap/dist/css/bootstrap.min.css";
import { TopHeader } from "./Component/Header/TopHeader";
import BtnHeader from "./Component/Header/BtnHeader";
import Home from "./Component/Bage/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProductData from "./Component/Bage/ProductDetails/ProductData";
import Cart from "./Component/Bage/Cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Component/Bage/ProductDetails/ScorllToTop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./Component/Bage/CategoryPage";
import SearchPage from "./Component/Bage/SearchPage";
import Favorites from "./Component/Bage/Favorites/Favorites";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtnHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "10px",
          },
        }}
      />

      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/Favorites" element={<Favorites/>} />
          <Route path="/products/:id" element={<ProductData />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
