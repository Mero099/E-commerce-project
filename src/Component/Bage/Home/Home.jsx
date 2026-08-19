import React, { useEffect, useState } from "react";
import HeroSlider from "./HeroSlider";
import SlideProduct from "../../slideProduct/SlideProduct";
import SlideLoading from "../../slideProduct/SlideLoading";
import PageTransitions from "../PageTransitions";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "mens-watches",
  "sunglasses",
  "sports-accessories",
];

export default function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`,
            );
            const data = await res.json();
            return { [category]: data.products || [] };
          }),
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageTransitions>
      <div>
        <HeroSlider />

        {loading
          ? categories.map((category) => <SlideLoading key={category} />)
          : categories.map((category) => (
              <SlideProduct
                key={category}
                data={products[category] || []}
                title={category.replace("-", " ")}
              />
            ))}
      </div>
    </PageTransitions>
  );
}
