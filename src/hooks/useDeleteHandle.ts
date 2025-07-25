import { useState } from "react";

type UseDeleteHandleProps<T> = {
  onDelete: (item: T) => Promise<void>;
  onAfterDelete?: () => void | Promise<void>;
};

export function useDeleteHandle<T>({
  onDelete,
  onAfterDelete,
}: UseDeleteHandleProps<T>) {
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!itemToDelete || isDeleting) return;
    setIsDeleting(true);

    try {
      await onDelete(itemToDelete);
      await onAfterDelete?.();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return {
    itemToDelete,
    setItemToDelete,
    isDeleting,
    confirmDelete,
  };
}
