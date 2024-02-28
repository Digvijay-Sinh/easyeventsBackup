import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPTimer from "../../../components/Timer";
import formbg from "../../../assets/events/formbgfinal.jpg";
const SignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const [otpTimerActive, setOtpTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const timerCompleted = () => {
    setTimerDone(true);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/send-otp`,
        { email }
      );
      if (res && res.data) {
        // router.push("/otp")
        setShowOtpScreen((prev) => !prev);
        setOtpTimerActive((prev) => !prev);

        console.log(res);
      } else {
        console.error("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/resend-otp`,
        { email }
      );
      if (res && res.data) {
        // router.push("/otp")
        // setShowOtpScreen((prev) => !prev);
        setTimerDone(false);
        console.log(res);
      } else {
        console.error("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/verify-otp`,
        { email, otp }
      );
      if (res && res.data) {
        setShowOtpScreen((prev) => !prev);
        setShowPasswordScreen((prev) => !prev);
        // router.push("/otp")

        console.log(res);
      } else {
        console.error("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passwordSetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      console.log("====================================");
      console.log("passwords do not match");
      console.log("====================================");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/set-password`,
        { email, password, verifyPassword }
      );
      if (res && res.data) {
        setShowPasswordScreen((prev) => !prev);
        navigate("/login");
        // router.push("/otp")

        console.log(res);
      } else {
        console.error("Some error occured");
      }
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
            {showOtpScreen === false && showPasswordScreen === false && (
              <div className="p-6 space-y-4 rounded-3xl md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Create an account
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

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border  rounded focus:ring-3  bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium  hover:underline text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
                  >
                    Verify your email
                  </button>
                  <p className="text-sm font-light text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="font-medium   hover:underline text-blue-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            )}
            {showOtpScreen === true && showPasswordScreen === false && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 rounded-3xl">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Enter OTP
                </h1>
                {otpTimerActive && <OTPTimer timerCompleted={timerCompleted} />}{" "}
                {/* Conditionally render the OTP timer component */}
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    verifyOtp(e)
                  }
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Your OTP
                    </label>
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOtp(e.target.value)
                      }
                      type="text"
                      name="otp"
                      id="otp"
                      className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter OTP"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
                  >
                    Verify OTP
                  </button>
                  <p className="text-sm font-light text-gray-400">
                    Don't get an OTP?{" "}
                    <button
                      disabled={timerDone}
                      onClick={() => {
                        resendOtp();
                      }}
                      className={`font-medium    hover:underline text-primary-500 ${
                        timerDone
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      } `}
                    >
                      Resend OTP
                    </button>
                  </p>
                </form>
              </div>
            )}
            {showOtpScreen === false && showPasswordScreen === true && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 backdrop-blur-md bg-black/50 rounded-3xl">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Enter password
                </h1>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    passwordSetter(e)
                  }
                  className="space-y-4 md:space-y-6"
                >
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
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setVerifyPassword(e.target.value)
                      }
                      type="confirm-password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-green-500 focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="font-medium  hover:underline text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
