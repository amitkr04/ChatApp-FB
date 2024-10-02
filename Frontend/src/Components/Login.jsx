import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    //for sending data to the backend
    axios
      .post("/api/user/login", userInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(res.data));
        setAuthUser(res.data);
      })
      .catch((error) => {
        // console.log(err);
        if (error.response) {
          toast.error("Error:" + error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl text-center">
            CHAT <span className="text-green-500 font-semibold">APP</span>
          </h1>
          <h2 className="text-xl text-black font-bold">Login</h2>
          <br />

          {/* email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 font-semibold">
              This field is required
            </span>
          )}

          {/* password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 font-semibold">
              This field is required
            </span>
          )}

          {/* text and button */}
          <div className="flex justify-between">
            <p>
              New user?{" "}
              <Link
                to="/signup"
                className="text-blue-500 underline cursor-pointer ml-1"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="text-black bg-blue-500 px-2 py-1 cursor-pointer rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
