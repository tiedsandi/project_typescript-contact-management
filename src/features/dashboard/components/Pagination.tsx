interface PaginationProps {
  page: number;
  totalPage: number;
  handlePageChange: (page: number) => void;
  getPages: () => number[];
}

export default function Pagination({
  page,
  totalPage,
  handlePageChange,
  getPages,
}: PaginationProps) {
  return (
    <div className="mt-10 flex justify-center">
      <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
          >
            <i className="fas fa-chevron-left mr-2"></i> Previous
          </button>
        )}

        {getPages().map((value) => (
          <button
            key={value}
            onClick={() => handlePageChange(value)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              value === page
                ? "bg-gradient text-white font-medium shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {value}
          </button>
        ))}

        {page < totalPage && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
          >
            Next <i className="fas fa-chevron-right ml-2"></i>
          </button>
        )}
      </nav>
    </div>
  );
}
