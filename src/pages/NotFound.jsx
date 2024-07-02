import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-grow">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto text-6xl text-red-500" />
          <h1 className="text-5xl font-bold mt-4">404</h1>
          <p className="text-xl mt-4">Page/Route Not Found</p>
          <p className="mt-2">Please check the URL again and proceed!</p>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full p-4 bg-gray-800 font-light text-white text-center">
        <span>Made with ❤️ by Arjun Palathinkara</span>
      </footer>
    </div>
  );
};

export default NotFound;
