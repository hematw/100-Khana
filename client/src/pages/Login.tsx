import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Button from "../components/Button";
import { AxiosError } from "axios";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");

      setLoginError(data.message || "Login failed, try again!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setLoginError(error.response.data.message);
        } else if (error.request) {
          setLoginError("Something went wrong! please try again");
        }
      }
      console.log(error);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="max-w-md w-[32rem] border-2 px-8 py-12 rounded-2xl shadow-xl">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-8 relative">
            <input
              type="text"
              {...register("email", {
                required: "Email field is empty!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              })}
              className="focus:ring-2 ring-red-400 border border-gray-300 rounded-2xl z-50 bg-transparent h-10 outline-none duration-150 indent-4 peer"
            />
            <label
              htmlFor="email"
              className={`absolute  left-4 text-gray-400 peer-focus:-top-7 duration-150 ${
                watch("email") ? "-top-7" : "top-2"
              }`}
            >
              Email
            </label>
            <p className="text-red-500 text-xs ml-2 mt-1">
              {errors.email ? errors.email.message : loginError && loginError}
            </p>
          </div>

          <div className="flex flex-col mt-8 relative">
            <input
              type="password"
              {...register("password", {
                required: "Password field is empty!",
              })}
              className="focus:ring-2 ring-red-400 border border-gray-300 rounded-2xl z-50 bg-transparent h-10 outline-none duration-150 indent-4 peer"
            />
            <label
              htmlFor="password"
              className={`absolute  left-4 text-gray-400 peer-focus:-top-7 duration-150 ${
                watch("password") ? "-top-7" : "top-2"
              }`}
            >
              Password
            </label>
            <p className="text-red-500 text-xs ml-2 mt-1">
              {errors.password
                ? errors.password.message
                : loginError && loginError}
            </p>
          </div>

          <div className="flex flex-col mt-12 ">
            <Button type="gradient">Login</Button>
            <Button type="dark" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
