import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const state = useSelector((s) => s);
  const { user } = state;
  const [p, setp] = useState(false);
  const hc = () => setp(!p);
  return (
    <div className="profile">
      <div>
        <h1>my Profile</h1>
        <p>name : {user?.name}</p>
        <p>email : {user?.email}</p>
        <p>phone : {user?.phone}</p>
        <p>
          password {"  "}
          {!p ? (
            <i onClick={hc} className="fa fa-eye"></i>
          ) : (
            <i onClick={hc} className="fa fa-lock"></i>
          )}{" "}
          : {p ? user?.password : "***"}
        </p>
      </div>
    </div>
  );
}
