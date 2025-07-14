import { Link, Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Outlet />

          <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
            <p>© 2025 Contact Management. All rights reserved.</p>
          </div>
        </main>
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="bg-gradient shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="flex items-center hover:opacity-90 transition-opacity duration-200"
        >
          <i className="fas fa-address-book text-white text-2xl mr-3"></i>
          <div className="text-white font-bold text-xl">Contact Management</div>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/dashboard/profile"
            className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
          >
            <i className="fas fa-user-circle mr-2"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-gray-100 hover:text-white flex items-center transition-colors duration-200 cursor-pointer"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
