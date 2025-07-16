type ContactInfoItemProps = {
  icon: string;
  label: string;
  value: string;
};

export default function ContactInfoItem({
  icon,
  label,
  value,
}: ContactInfoItemProps) {
  return (
    <p className="flex items-center">
      <i className={`${icon} text-gray-500 w-6`}></i>
      <span className="font-medium w-24">{label}:</span>
      <span>{value}</span>
    </p>
  );
}
