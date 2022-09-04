import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as services from "../util";
export function AllTags() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const hc = (payload) => dispatch({ type: "tagname", payload });
  const hs = (e) => dispatch({ type: "search", payload: e.target.value });
  return (
    <div className="tags">
      <input placeholder="search" onChange={hs} value={state.search} />
      {state?.tags?.map((x, i) => (
        <button
          onClick={(e) => hc(x.t)}
          className={`${state.tagname === x.t ? "active" : ""}`}
          key={i}
        >
          {x.t} {x.c}
        </button>
      ))}
    </div>
  );
}
export function AllProducts() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();

  const products = state.products
    .filter((x) => Object.values(x).join("").includes(state.search))
    .filter((x) => x.tags.startsWith(state.tagname))
    .sort((x, y) =>
      state.order ? x[state.col] - y[state.col] : y[state.col] - x[state.col]
    );
  return (
    <div className="products">
      {products?.map((x, i) => (
        <Product {...x} key={i} />
      ))}
    </div>
  );
}

export const Product = (props) => {
  const state = useSelector((s) => s);
  const base = `https://endothermic-fetches.000webhostapp.com/`;
  const dispatch = useDispatch();
  const hc = () => {
    services
      ._addToCart(props.id)
      .then((d) => {
        if (d.status === "good") {
          services.t("added to cart", 1);
          dispatch({ type: "cart", payload: d.data });
        } else {
          services.t("server timeout", 0);
        }
      })
      .catch((e) => {
        services.t(e.message, 0);
      });
  };
  return (
    <div className="item">
      <img src={base + props.image} alt="" />
      <div>{props.title}</div>
      <div>{props.price}</div>
      <div>
        <i
          style={{ color: 1 <= props.rating ? "orange" : "silver" }}
          className="fa fa-star"
        ></i>
        <i
          style={{ color: 2 <= props.rating ? "orange" : "silver" }}
          className="fa fa-star"
        ></i>
        <i
          style={{ color: 3 <= props.rating ? "orange" : "silver" }}
          className="fa fa-star"
        ></i>
        <i
          style={{ color: 4 <= props.rating ? "orange" : "silver" }}
          className="fa fa-star"
        ></i>
        <i
          style={{ color: 5 <= props.rating ? "orange" : "silver" }}
          className="fa fa-star"
        ></i>
      </div>
      <div className="discount">{props.discount} % off</div>
      <div className="tags">{props.tags}</div>
      {state.user && (
        <button className="cart-btn" onClick={hc}>
          <i className="fa fa-shopping-cart"></i>
        </button>
      )}
    </div>
  );
};

export const AllFilters = (props) => {
  const dispatch = useDispatch();

  const hs = (e) => {
    if (e.target.className === "asc") {
      dispatch({ type: "sort", payload: { col: e.target.value, order: true } });
    } else {
      dispatch({
        type: "sort",
        payload: { col: e.target.value, order: false },
      });
    }
  };
  return (
    <div className="filters">
      <div>
        <p>Low To High</p>
        <select className="asc" onChange={hs}>
          <option value="other">Select</option>
          <option value="id">relevance</option>
          <option value="price">price</option>
          <option value="rating">rating</option>
          <option value="discount">discount</option>
          <option value="tags">tags</option>
        </select>
      </div>
      <div>
        <p>High To Low</p>
        <select className="desc" onChange={hs}>
          <option value="other">Select</option>
          <option value="id">relevance</option>
          <option value="price">price</option>
          <option value="rating">rating</option>
          <option value="discount">discount</option>
          <option value="tags">tags</option>
        </select>
      </div>
    </div>
  );
};
