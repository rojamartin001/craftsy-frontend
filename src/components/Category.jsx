import React, { useState } from "react";
import CraftCard from "./CraftCard";

const Category = ({ craft }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Handmade Art & Crafts",
    "Wearable & Fashion Crafts",
    "Home & Decorative DIY",
  ];

  return (
    <div className="row mt-5 mx-2">
      <div className="col-md-3">
        {categories.map((cat, index) => (
          <div className="row mb-4" key={index}>
            <button
              className={`btn w-100 ${selectedCategory === cat ? "btn-dark" : "btn-danger"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      <div className="col-md-9">
        <div className="row">
          {craft && craft.length > 0 ? (
    craft
      .filter(
        (item) =>
          selectedCategory === "All" || item.category === selectedCategory
      )
      .map((item) => (
        <div className="col-md-4 mb-3" key={item._id}>
          <CraftCard craft={item} />
        </div>
      ))
  ) : (
    <div className="col-12 text-center text-danger">
      <h4>Crafts not uploaded yet</h4>
    </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default Category;
