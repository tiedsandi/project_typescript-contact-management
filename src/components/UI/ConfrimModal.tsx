import Button from "./Button.component";

type Props = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}: Props) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-gray-300 mb-4">{description}</p>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
