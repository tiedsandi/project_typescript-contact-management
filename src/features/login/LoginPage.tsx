import { Link } from "react-router";
import LoginForm from "./components/LoginForm";

export default function UserLogin() {
  return (
    <>
      <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient rounded-full mb-4">
            <i className="fas fa-address-book text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white">Contact Management</h1>
          <p className="text-gray-300 mt-2">Sign in to your account</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-gray-400">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
