import ContactCardWrapper from "./ContactCardWrapper";
import { Link } from "react-router";

export default function CreateContactCard() {
  return (
    <ContactCardWrapper className="border-2 border-dashed">
      <Link to="/dashboard/contacts/create" className="block p-6 h-full">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Create New Contact
          </h2>
          <p className="text-gray-300">Add a new contact to your list</p>
        </div>
      </Link>
    </ContactCardWrapper>
  );
}
