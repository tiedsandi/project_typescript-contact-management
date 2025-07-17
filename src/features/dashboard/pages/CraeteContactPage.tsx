import Button from "@/components/UI/Button.component";
import FormCard from "@/components/FormCard";
import Input from "@/components/UI/Input.component";
import PageHeader from "../components/PageHeader";

export default function CreateContactPage() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Contacts"
        title="Create New Contact"
        iconClass="fas fa-user-plus"
      />

      <div className="max-w-2xl mx-auto">
        <FormCard
          bgIcon="bg-blue-500"
          icon={<i className="fas fa-user-plus text-white" />}
          title="New Contact Information"
          FormNode={
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <Input
                  label="First Name"
                  name="first_name"
                  placeholder="Enter first name"
                  icon={<i className="fas fa-user-tag text-gray-500"></i>}
                  required
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  placeholder="Enter last name"
                  icon={<i className="fas fa-user-tag text-gray-500"></i>}
                  required
                />
              </div>

              <Input
                label="Email"
                name="email"
                placeholder="Enter email address"
                icon={<i className="fas fa-envelope text-gray-500"></i>}
                required
              />

              <Input
                label="Phone"
                name="phone"
                placeholder="Enter email number"
                icon={<i className="fas fa-phone text-gray-500"></i>}
                required
              />

              <div className="flex justify-end space-x-4">
                <Button
                  to="/dashboard"
                  variant="secondary"
                  className=" flex items-center"
                >
                  <i className="fas fa-times mr-2"></i> Cancel
                </Button>
                <Button type="submit" className=" flex items-center">
                  <i className="fas fa-plus-circle mr-2"></i> Create Contact
                </Button>
              </div>
            </form>
          }
        />
      </div>
    </>
  );
}
