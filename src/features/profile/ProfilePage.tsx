import FormCard from "../../components/FormCard";
import FormPassword from "./components/FormPassword";
import FormProfile from "./components/FormProfile";
import { useLoaderData } from "react-router";

export default function UserProfilePage() {
  const { username, name } = useLoaderData() as {
    username: string;
    name: string;
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormCard
          FormNode={<FormProfile name={name} username={username} />}
          title="Edit Profile"
          bgIcon="bg-blue-500"
          icon={<i className="fas fa-user-edit text-white"></i>}
        />
        <FormCard
          FormNode={<FormPassword />}
          title="Change Password"
          bgIcon="bg-purple-500"
          icon={<i className="fas fa-key text-white"></i>}
        />
      </div>
    </>
  );
}
