import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

// A simple error page with a "button" back to start
export default function ErrorPage() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-default px-4">
      <img src={logo} alt="STRAJK Logo" />
      <h1 className="text-6xl font-bold text-primaryColor mt-9">404</h1>
      <p className="text-sm text-center font-semibold text-secondaryColor mt-5">
        The requested bowling lane was not found on this url.
      </p>
      <Link
        to={"/"}
        className="px-5 py-3 bg-primaryColor text-white rounded-sm mt-10 font-bold text-lg"
      >
        Back to start
      </Link>
    </main>
  );
}
