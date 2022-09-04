import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
