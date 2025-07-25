import { useNavigate } from "react-router";

type PageHeaderProps = {
  backTo: string | "auto";
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
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo === "auto") {
      if (window.history.length <= 1) {
        navigate("/dashboard");
      } else {
        navigate(-1);
      }
    } else {
      navigate(backTo);
    }
  };

  return (
    <div className="flex items-center mb-6">
      <button
        onClick={handleBack}
        className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
      >
        <i className="fas fa-arrow-left mr-2"></i> {backLabel}
      </button>
      <h1 className="text-2xl font-bold text-white flex items-center">
        <i className={`${iconClass} text-blue-400 mr-3`}></i> {title}
      </h1>
    </div>
  );
}
