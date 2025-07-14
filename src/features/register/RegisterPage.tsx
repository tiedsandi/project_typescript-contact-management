import { Link } from "react-router";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>
      <RegisterForm />
      <div className="text-center text-sm text-gray-400 mt-4">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 ml-1"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
