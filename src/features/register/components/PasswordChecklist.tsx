type PasswordStatus = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  symbol: boolean;
};

export function PasswordChecklist({ status }: { status: PasswordStatus }) {
  return (
    <ul className="text-xs text-gray-300 mb-2 ml-1 space-y-1">
      <li className={status.length ? "text-green-400" : "text-red-400"}>
        {status.length ? "✅" : "❌"} At least 6 characters
      </li>
      <li className={status.uppercase ? "text-green-400" : "text-red-400"}>
        {status.uppercase ? "✅" : "❌"} 1 uppercase letter
      </li>
      <li className={status.lowercase ? "text-green-400" : "text-red-400"}>
        {status.lowercase ? "✅" : "❌"} 1 lowercase letter
      </li>
      <li className={status.symbol ? "text-green-400" : "text-red-400"}>
        {status.symbol ? "✅" : "❌"} 1 symbol (!@#$...)
      </li>
    </ul>
  );
}
