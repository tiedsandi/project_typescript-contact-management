import { useState } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <i className="fas fa-search text-blue-400 mr-3"></i>
          <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
        >
          <i
            className={`fas text-lg ${
              isOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </button>
      </div>

      {/* Search Form */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 m-1 gap-5">
            {/* Name */}
            <div>
              <label
                htmlFor="search_name"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="search_name"
                  name="search_name"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Search by name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="search_email"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="search_email"
                  name="search_email"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Search by email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="search_phone"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="search_phone"
                  name="search_phone"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Search by phone"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 text-right">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-search mr-2"></i> Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
