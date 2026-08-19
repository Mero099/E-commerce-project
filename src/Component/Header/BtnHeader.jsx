import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/About" },
  { title: "Accessories", path: "/Accessories" },
  { title: "Blog", path: "/Blog" },
  { title: "Contact", path: "/Contact" },
];

function formatCategoryName(value) {
  if (!value) return "Category";

  return String(value)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BtnHeader() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    setIsCategoryOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("Failed to load categories");

        const data = await res.json();

        if (!ignore) {
          const normalizedCategories = Array.isArray(data)
            ? data.map((category) => {
                if (typeof category === "string") {
                  return {
                    slug: category,
                    name: formatCategoryName(category),
                  };
                }

                return {
                  slug: category?.slug || category?.name || "",
                  name:
                    category?.name ||
                    formatCategoryName(category?.slug || category?.name),
                };
              })
            : [];

          setCategories(normalizedCategories);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="Btn_Header">
      <div className="container">
        <nav className="nav">
          <div className="category_nav">
            <div
              className="category_btn"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              <IoMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>

            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav_links">
            {navLinks.map((item) => (
              <li
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </div>
        </nav>

        <div className="sing_icon">
          <Link to="/" className="text-white">
            <PiSignInBold />
          </Link>
          <Link to="/" className="text-white">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}
