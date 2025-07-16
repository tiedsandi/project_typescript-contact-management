type ContactCardWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContactCardWrapper({
  children,
  className = "",
}: ContactCardWrapperProps) {
  return (
    <div
      className={`bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border border-gray-700 card-hover animate-fade-in ${className}`}
    >
      {children}
    </div>
  );
}
