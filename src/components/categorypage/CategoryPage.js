import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import ItemCard from "./components/ItemCard";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles/CategoryPage.css";

const CategoryPage = ({ menu }) => {
  const [items, setItems] = useState([]);

  const categoryItems = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  useEffect(() => {
    if (Object.keys(categoryItems).includes(menu.cid)) {
      setItems(categoryItems[menu.cid]);
    }
  }, [categoryItems]);

  return (
    <div>
      <h1
        className="category-header"
        style={{
          background: `url(https://demob2b2c.avetti.io/preview/store${menu.image}) no-repeat center center`,
          backgroundSize: "cover"
        }}
      >
        {menu.name}
      </h1>
      <Grid container spacing={3}>
        {items.length > 0 ? (
          items.map((item, index) => {
            return (
              <Grid item xs={3}>
                <ItemCard key={index} {...item} />
              </Grid>
            );
          })
        ) : (
          <div
            style={{
              width: "100%",
              dispay: "flex",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Grid>
    </div>
  );
};

export default CategoryPage;
