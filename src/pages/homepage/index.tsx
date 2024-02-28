import { useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import { Card } from "flowbite-react";
import PosterImage2 from "../../assets/events/matthew-osborn-wMRIcT86SWU-unsplash.jpg";
import axios, { axiosPrivate } from "../../api/axios";
import { AuthData, useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";
const HomePage = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refreshToken", {
      withCredentials: true,
    });
    if (
      response.status === 403 ||
      response.status === 401 ||
      response.status === 400
    ) {
      navigate("/");
      return null; // Return null or handle the error accordingly
    }
    setAuth((prevAuth: AuthData | null) => ({
      ...prevAuth!,
      accessToken: response.data.accessToken,
      // Include other properties if needed
    }));
    return response.data.accessToken;
  };
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (auth && "accessToken" in auth) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          // Set the expiration time to 20 seconds from the current time

          // Set the cookie with the specified expiration time

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);
  return (
    <div className="bg-black">
      <Hero />
      <div>
        <Card
          className="max-w-sm"
          renderImage={() => (
            <img width={500} height={500} src={PosterImage2} alt="image 1" />
          )}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
      </div>
      Homepage2
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/eventpage");
          }}
        >
          Event page
        </button>
      </div>
      <div>
        <button
          className="bg-slate-500"
          onClick={() => {
            navigate("/addevent");
          }}
        >
          Add event
        </button>
      </div>
    </div>
  );
};

export default HomePage;
