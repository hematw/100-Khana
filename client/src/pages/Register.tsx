import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { AxiosError } from "axios";
import Button from "../components/Button";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

type ServerError = {
  message: string;
  duplicateField: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ServerError>({
    message: "",
    duplicateField: "",
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setServerError(error.response.data);
          console.log(error.response.data);
        } else if (error.request) {
          setServerError({
            message: "Something went wrong! please try again",
            duplicateField: "",
          });
          console.log(error.message);
        }
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="max-w-md w-[32rem] border-2 px-8 py-12 rounded-2xl shadow-xl">
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-8 relative">
            <input
              type="text"
              {...register("username", { required: "Username is required!" })}
              className="focus:ring-2 ring-red-400 border border-gray-300 rounded-2xl z-50 bg-transparent h-10 outline-none duration-150 indent-4 peer"
            />
            <label
              htmlFor="email"
              className={`absolute  left-4 text-gray-400 peer-focus:-top-7 duration-150 ${
                watch("username") ? "-top-7" : "top-2"
              }`}
            >
              Username
            </label>
            {errors.username ? (
              <p className="text-red-500 text-xs ml-2 mt-1">
                <span>{errors.username.message}</span>
              </p>
            ) : (
              serverError.duplicateField === "username" && (
                <p className="text-red-500 text-xs ml-2 mt-1">
                  <span>{serverError.message}</span>
                </p>
              )
            )}
          </div>

          <div className="flex flex-col mt-8 relative">
            <input
              type="text"
              {...register("email", {
                required: "Email is required!",
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
            {errors.email ? (
              <p className="text-red-500 text-xs ml-2 mt-1">
                <span>{errors.email.message}</span>
              </p>
            ) : (
              serverError.duplicateField === "email" && (
                <p className="text-red-500 text-xs ml-2 mt-1">
                  <span>{serverError.message}</span>
                </p>
              )
            )}
          </div>

          <div className="flex flex-col mt-8 relative">
            <input
              type="text"
              {...register("password", { required: "Password is required!" })}
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
            {errors.password && (
              <p className="text-red-500 text-xs ml-2 mt-1">
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col mt-12 ">
            <Button type="gradient">Register</Button>
            <Button type="dark" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
