import { Link } from "react-router";

type PageHeaderProps = {
  backTo: string;
  backLabel?: string;
  title: string;
  iconClass: string;
};

export default function PageHeader({
  backTo,
  backLabel = "Back",
  title,
  iconClass,
}: PageHeaderProps) {
  return (
    <div className="flex items-center mb-6">
      <Link
        to={backTo}
        className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
      >
        <i className="fas fa-arrow-left mr-2"></i> {backLabel}
      </Link>
      <h1 className="text-2xl font-bold text-white flex items-center">
        <i className={`${iconClass} text-blue-400 mr-3`}></i> {title}
      </h1>
    </div>
  );
}
