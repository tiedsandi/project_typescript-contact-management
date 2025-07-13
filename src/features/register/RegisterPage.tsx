import { Form, Link } from "react-router";

import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";

export default function RegisterPage() {
  return (
    <>
      <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient rounded-full mb-4">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white">Contact Management</h1>
          <p className="text-gray-300 mt-2">Create a new account</p>
        </div>

        <Form>
          <Input
            name="username"
            label="Username"
            placeholder="Choose a username"
            required
            icon={<i className="fas fa-user text-gray-500"></i>}
          />

          <Input
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            required
            icon={<i className="fas fa-id-card text-gray-500"></i>}
          />

          <Input
            name="password"
            label="Password"
            placeholder="Create a password"
            type="password"
            required
            icon={<i className="fas fa-lock text-gray-500"></i>}
          />

          <Input
            name="confirm_password"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            required
            icon={<i className="fas fa-check-double text-gray-500"></i>}
          />

          <div className="mb-6">
            {/* <button
              type="submit"
              className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-user-plus mr-2"></i> Register
            </button> */}
            <Button type="submit" variant="primary" className="w-full">
              <i className="fas fa-user-plus mr-2"></i> Register
            </Button>
          </div>

          {/* <Button
            to="/dashboard/contacts"
            variant="secondary"
            className="flex items-center"
          >
            <i className="fas fa-times mr-2"></i> Cancel
          </Button>

          <Button
            //  onClick={handleDelete}
            variant="danger"
            className="flex items-center"
          >
            <i className="fas fa-trash-alt mr-2"></i> Delete
          </Button> */}

          <div className="text-center text-sm text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
