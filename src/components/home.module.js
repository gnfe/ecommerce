import React from "react";
import { useSelector, useDispatch } from "react-redux";
export function AllTags() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const hc = (e) => dispatch({ type: "tagname", payload: e.t });
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
  const base = `https://endothermic-fetches.000webhostapp.com/`;
  const hc = () => {
    // addToCart here
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
      <div>
        <button onClick={hc}>
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
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
