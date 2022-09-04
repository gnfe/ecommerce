import React from "react";
import { useSelector, useDispatch } from "react-redux";
export function AllTags() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const hc = (e) => dispatch({ type: "tagname", payload: e.t });
  return (
    <div className="tags">
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

  const products = state.products;
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
  return (
    <div className="item">
      <img src={base + props.image} alt="" />
      <div>{props.title}</div>
      <div>{props.price}</div>
      <div>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
      </div>
      <div className="discount">{props.discount} % off</div>
      <div className="tags">{props.tags}</div>
      <div>
        <button>
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
};
