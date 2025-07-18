import type { ReactNode } from "react";

type FormCard = {
  bgIcon?: string;
  FormNode: ReactNode;
  icon: ReactNode;
  title: string;
};

export default function FormCard({
  bgIcon = "bg-blue-500",
  FormNode,
  icon,
  title,
}: FormCard) {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 ${bgIcon} rounded-full flex items-center justify-center mr-3 shadow-md`}
          >
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        {FormNode}
      </div>
    </div>
  );
}
