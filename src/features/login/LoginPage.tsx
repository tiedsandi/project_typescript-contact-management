import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import { toast } from "sonner";

export default function UserLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shownRef = useRef(false);

  // useEffect(() => {
  //   const msg = searchParams.get("msg");
  //   if (msg === "register-success") {
  //     toast.success("You are on set, go login!");
  //     navigate("/login", { replace: true });
  //   }
  // }, [searchParams, navigate]);

  // mengakali agar tidak muncul 2x karena strictMode
  useEffect(() => {
    const msg = searchParams.get("msg");

    if (msg === "register-success" && !shownRef.current) {
      shownRef.current = true;
      toast.success("You are on set, go login!");

      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

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
