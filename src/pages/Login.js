import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as services from "../util";
export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    services
      ._login(data)
      .then((d) => {
        if (d.data) {
          services.t("login succes " + d.data.name, true);
          services.setStorage("user", JSON.stringify(d.data));
          dispatch({ type: "login", payload: d.data });
          // nav("/Profile");
        } else {
          return Promise.reject({ message: "failed to login" });
        }
      })
      .catch((e) => services.t(e.message, false));
  };
  return (
    <form className="auth" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div>
        <p>email</p>
        <input placeholder="email" {...register("email", { required: true })} />
        {errors.email && <p className="error">username is required</p>}
      </div>

      <div>
        <p>password</p>
        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="error">password is required</p>}
      </div>

      <button>login</button>
    </form>
  );
}
