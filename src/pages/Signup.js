import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as services from "../util";
export default function Signup() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    services
      ._signup(data)
      .then((d) => {
        if (d.status === "good") {
          services.t("Signup succes ", true);
        } else {
          return Promise.reject({ message: "failed to Signup" });
        }
      })
      .catch((e) => services.t(e.message, false));
  };
  return (
    <form className="auth" onSubmit={handleSubmit(onSubmit)}>
      <h1>Signup</h1>
      <div>
        <p>name</p>
        <input placeholder="name" {...register("name", { required: true })} />
        {errors.name && <p className="error">your name is required</p>}
      </div>

      <div>
        <p>email</p>
        <input placeholder="email" {...register("email", { required: true })} />
        {errors.email && <p className="error">username is required</p>}
      </div>

      <div>
        <p>phone</p>
        <input placeholder="phone" {...register("phone", { required: true })} />
        {errors.phone && <p className="error">mobile is required</p>}
      </div>

      <div>
        <p>password</p>
        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="error">password is required</p>}
      </div>

      <button>Signup</button>
    </form>
  );
}
