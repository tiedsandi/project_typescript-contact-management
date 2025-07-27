import Button from "@/components/UI/Button.component";

type FormActionsProps = {
  isSubmitting: boolean;
  isEditMode: boolean;
};

export default function FormActions({
  isSubmitting,
  isEditMode,
}: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <Button to="/dashboard" variant="secondary">
        <i className="fas fa-times mr-2" /> Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2" />
            {isEditMode ? "Updating..." : "Creating..."}
          </>
        ) : (
          <>
            <i
              className={`fas fa-${isEditMode ? "edit" : "plus-circle"} mr-2`}
            />
            {isEditMode ? "Update Contact" : "Create Contact"}
          </>
        )}
      </Button>
    </div>
  );
}
