import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Productdetails.css";

import SlideProduct from "../../slideProduct/SlideProduct";
import ProductLoading from "./ProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransitions from "../PageTransitions";

export default function ProductData() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        //....//
        const data = await res.json();
        if (isMounted) {
          setProduct(data);
          setSelectedImage(data.images?.[0] || "");
        }
        //....//
      } catch (error) {
        console.error(error);
        //....//
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!product?.category) {
      setRelatedProducts([]);
      setLoadingRelatedProducts(false);
      return;
    }

    let isMounted = true;
    setLoadingRelatedProducts(true);

    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch related products");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setRelatedProducts(Array.isArray(data.products) ? data.products : []);
        }
      })
      .catch((error) => {
        console.error(error);
        if (isMounted) setRelatedProducts([]);
      })
      .finally(() => {
        if (isMounted) setLoadingRelatedProducts(false);
      });

    return () => {
      isMounted = false;
    };
  }, [product?.category]);

  if (loading) return;
  if (!product) return <p>Product Not Found.</p>;

  const images = Array.isArray(product.images) ? product.images : [];
  const availabilityText = product.stock > 0 ? "In stock" : "Out of stock";

  return (
    <PageTransitions key={id}>
      <div>
        {loadingRelatedProducts ? (
          <SlideProduct />
        ) : (
          <div className="item_details">
            <div className="container">
              <ProductImages
                product={product}
                images={images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              <ProductInfo
                product={product}
                availabilityText={availabilityText}
              />
            </div>
          </div>
        )}

        {loadingRelatedProducts ? (
          <SlideProduct />
        ) : (
          <SlideProduct
            key={product.category}
            data={relatedProducts}
            title={product.category?.replace("-", " ") || "Related products"}
          />
        )}
      </div>
    </PageTransitions>
  );
}
