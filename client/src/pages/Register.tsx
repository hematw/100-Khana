import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { AxiosError } from "axios";
import Button from "../components/Button";
import Input from "../components/Input";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

type ServerError = {
  message: string;
  duplicateField: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ServerError>({
    message: "",
    duplicateField: "",
  });

  const {
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
        <h1 className="text-center text-2xl font-bold">Register to <span className="text-gradient">100 Khana</span></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col relative mt-4">
            <Input
              name="username"
              label="Username"
              register={register}
              validation={{ required: "Username is required!" }}
              error={errors.username}
            />
            {!errors.username && serverError.duplicateField === "username" && (
              <p className="error">
                <span>{serverError.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col relative mt-4">
            <Input
              name="email"
              label="Email"
              register={register}
              error={errors.email}
              validation={{
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email!",
                },
              }}
            />
            {!errors.email && serverError.duplicateField === "email" && (
              <p className="error">
                <span>{serverError.message}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col relative mt-4">
            <Input
              name="password"
              label="Password"
              register={register}
              error={errors.password}
              validation={{ required: "Password is required!" }}
            />
          </div>

          <div className="flex flex-col mt-8">
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

export default Register