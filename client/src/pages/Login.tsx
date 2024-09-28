import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Button from "../components/Button";
import { AxiosError } from "axios";
import Input from "../components/Input";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    console.log(values);
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
        <h1 className="text-center text-2xl font-bold">Login to <span className="text-gradient">100 Khana</span></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-4 relative">
            <Input
              name="email"
              label="Email"
              register={register}
              error={errors.email}
              validation={{
                required: "Email field is empty!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              }}
            />
            {!errors.email && loginError && (
              <p className="error">{loginError}</p>
            )}
          </div>

          <div className="flex flex-col mt-4 relative">
            <Input
              name="password"
              label="Password"
              register={register}
              error={errors.password} // Only pass FieldError
              validation={{
                required: "Password field is empty!",
              }}
            />
            {!errors.password && loginError && (
              <p className="error">{loginError}</p>
            )}
          </div>

          <div className="flex flex-col mt-8">
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
