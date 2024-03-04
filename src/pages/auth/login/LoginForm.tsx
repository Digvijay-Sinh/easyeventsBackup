import axios from "../../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formbg from "../../../assets/events/formbgfinal.jpg";
import { useAuth } from "../../../context/AuthProvider";

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = res?.data?.accessToken;
      setAuth({ email, accessToken });
      console.log(auth);
      navigate("/protected");

      console.log(JSON.stringify(res?.data));
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section
        style={{ backgroundImage: `url(${formbg})` }}
        className="bg-no-repeat bg-center bg-cover "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full   shadow   md:mt-0 sm:max-w-md xl:p-0 bg-transparent">
            <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmit(e)
                }
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    type="email"
                    name="email"
                    id="email"
                    className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium   hover:underline text-blue-500"
                  >
                    Signup here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
