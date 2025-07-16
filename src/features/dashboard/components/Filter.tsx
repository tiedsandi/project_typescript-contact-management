import Button from "@/components/UI/Button.component";
import type { FilterProps } from "../types";
import Input from "@/components/UI/Input.component";
import { useState } from "react";

export default function Filter({ filters, setFilters }: FilterProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(localFilters);
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <i className="fas fa-search text-blue-400 mr-3"></i>
          <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full"
        >
          <i
            className={`fas text-lg ${
              isOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </button>
      </div>

      {/* Form */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 m-1 gap-5">
            <Input
              label="Name"
              placeholder="Search by name"
              name="name"
              value={localFilters.name}
              onChange={handleChange}
              icon={<i className="fas fa-user text-gray-500"></i>}
            />
            <Input
              label="Email"
              placeholder="Search by email"
              name="email"
              value={localFilters.email}
              onChange={handleChange}
              icon={<i className="fas fa-envelope text-gray-500"></i>}
            />
            <Input
              label="Phone"
              placeholder="Search by phone"
              name="phone"
              value={localFilters.phone}
              onChange={handleChange}
              icon={<i className="fas fa-phone text-gray-500"></i>}
            />
          </div>
          <div className="mt-5 text-right">
            <Button type="submit" className="px-5 py-3">
              <i className="fas fa-search mr-2"></i> Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
