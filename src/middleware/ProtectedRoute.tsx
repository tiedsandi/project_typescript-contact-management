import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(function () {
        navigate("/login", { replace: true });
      }, 2000);
    } else {
      setChecking(false);
    }
  }, [navigate]);

  if (checking) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <div className="text-center text-white">Checking auth...</div>
      </div>
    );
  }

  return <>{children}</>;
}
