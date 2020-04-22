import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ItemCard from "./components/ItemCard";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles/CategoryPage.css";
import {
  categoryRequest,
  categoryFetchRequest
} from "../../redux/actions/categoryActions";

const SagaCategoryPage = ({ menu }) => {
  const { shopId } = useParams();
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [nameState, setNameState] = useState("");
  const [imageState, setImageState] = useState("");
  const [cidState, setCidState] = useState("");
  const [loadingState, setLoadingState] = useState(true);

  const categoryItems = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  const menuState = useSelector(state => state.menuReducer.menu, shallowEqual);

  const categoryState = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  useEffect(() => {
    if (menuState.length > 0) {
      if (menuState.some(menu => menu.url === `/${shopId}`)) {
        const temp = menuState.filter(menu => menu.url === `/${shopId}`)[0];
        setNameState(temp.name);
        setImageState(temp.image);
        setCidState(temp.cid);
      }
    }
  }, [menuState, shopId]);

  useEffect(() => {
    if (cidState !== "") {
      if (!Object.keys(categoryState).includes(cidState)) {
        dispatch(categoryFetchRequest(cidState));
      } else {
        setItems([...categoryState[cidState]]);
        setLoadingState(false);
      }
    }
  }, [cidState]);

  useEffect(() => {
    if (Object.keys(categoryState).includes(cidState)) {
      setItems([...categoryState[cidState]]);
      setLoadingState(false);
    }
  }, [categoryState]);

  useEffect(() => {
    setLoadingState(true);
  }, [shopId]);

  return (
    <div>
      <h1
        className="category-header"
        style={{
          background: `url(https://demob2b2c.avetti.io/preview/store${imageState}) no-repeat center center`,
          backgroundSize: "cover"
        }}
      >
        {nameState}
      </h1>
      <Grid container spacing={3}>
        {!loadingState ? (
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

export default SagaCategoryPage;
