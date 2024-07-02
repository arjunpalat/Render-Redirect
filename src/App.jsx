import { IoEarth } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
import { messages } from "./components/index";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [loadStatus, setLoadStatus] = useState(-1);
  const [status, setStatus] = useState(0);
  const myURL = import.meta.env.VITE_RD_URLS.split(" ")[0].split("::")[1];
  const searchParams = useParams();
  console.log(searchParams.id);

  const getURL = () => {
    if (import.meta.env.VITE_RD_URLS.includes(searchParams.id + "::")) {
      console.log(
        import.meta.env.VITE_RD_URLS.split(searchParams.id + "::")[1].split(
          " "
        )[0]
      );
      return import.meta.env.VITE_RD_URLS.split(
        searchParams.id + "::"
      )[1].split(" ")[0];
    }
    navigate("/404");
  };

  const handleFunction = () => {
    return setInterval(() => {
      setLoadStatus((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    const pingURL = async () => {
      let intervalId;
      try {
        intervalId = handleFunction();
        const response = await axios.get(getURL());
        setStatus(1);
      } catch (error) {
        setStatus(-1);
      } finally {
        clearInterval(intervalId);
        setLoadStatus(7);
      }
    };
    pingURL();
  }, []);

  useEffect(() => {
    if (status === 1) {
      setTimeout(() => {
        window.location.href = getURL();
      }, 2000);
    }
  }, [status]);
  return (
    <div className="bg-slate-700 h-screen p-8 flex items-center justify-center w-full">
      <div className="h-76 max-w-96 bg-slate-300 rounded-md p-4 w-full shadow-lg shadow-blue-600">
        <div className="w-full mx-auto">
          <p
            className={`text-3xl ${
              status === 0
                ? "text-blue-600"
                : status === -1
                ? "text-red-600"
                : "text-teal-500"
            } font-bold text-center`}
          >
            {status === 0 ? "LOADING" : status === -1 ? "ERROR" : "SUCCESS"}
          </p>
        </div>
        <div className="w-full mx-auto mt-8 flex gap-4 justify-evenly">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              className={`w-6 h-6 rounded-3xl border-black border-1 ${
                index <= loadStatus
                  ? status === 0
                    ? "bg-blue-600"
                    : status === -1
                    ? "bg-red-600"
                    : "bg-teal-500"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
        <div className="w-full mx-auto mt-8">
          {status === 0 && (
            <IoEarth className="text-blue-600 text-6xl mx-auto" />
          )}
          {status === -1 && (
            <MdError className="text-red-600 mx-auto text-6xl" />
          )}
          {status === 1 && (
            <FaCircleCheck className="text-teal-500 mx-auto text-6xl" />
          )}
        </div>
        <div className="w-full mx-auto mt-8 h-10 bg-black rounded-3xl border-2 border-blue-500 flex justify-center items-center">
          <p className="text-white text-center">
            {
              messages[
                status !== -1
                  ? status === 0
                    ? Math.min(loadStatus + 1, 8)
                    : 9
                  : 10
              ]
            }
          </p>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full p-4 bg-gray-800 font-light text-white text-center">
        <span>Made with ❤️ by Arjun Palathinkara</span>
      </footer>
    </div>
  );
};

export default App;
