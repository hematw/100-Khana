import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-svh flex justify-center items-center text-center">
      <div className="max-w-fit drop-shadow-2xl">
        <h2 className="text-7xl font-bold text-red-400 drop-shadow-2xl">OOPS!</h2>
        <h3 className="text-4xl font-semibold mt-10">Looks you are lost?</h3>
        <p className="mt-2 text-lg">Requested page not found in our server</p>
        <Link to={"/"} className="bg-red-400 w-full mt-6 px-4 py-2 text-white rounded-lg shadow-lg inline-block hover:drop-shadow-2xl duration-200">
            Go to Home
        </Link>
      </div>
    </div>
  );
}
