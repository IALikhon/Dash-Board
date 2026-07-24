import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 text-center">
        404 | PAGE NOT FOUND!
      </h1>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
