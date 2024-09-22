import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    console.log(values);
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("error is here");
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
              {errors.email && <span>{errors.email.message}</span>}
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
              {errors.password && <span>{errors.password.message}</span>}
            </p>
          </div>

          <div className="flex flex-col mt-12 ">
            <button
              type="submit"
              className="bg-red-400 text-white h-10 rounded-2xl hover:bg-red-400/90 duration-150"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="border border-red-400 text-red-400 h-10 rounded-2xl hover:bg-red-100 duration-150 mt-4"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
