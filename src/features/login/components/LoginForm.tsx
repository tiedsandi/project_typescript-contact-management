import { Form, useActionData, useNavigation } from "react-router";

import Button from "@/components/UI/Button.component";
import Input from "@/components/UI/Input.component";

export default function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData() as {
    errors?: Partial<Record<"username" | "password", string>>;
    values?: Partial<{ username: string; password: string }>;
  };

  return (
    <Form method="post">
      <Input
        name="username"
        label="Username"
        placeholder="Choose a username"
        icon={<i className="fas fa-user text-gray-500" />}
        defaultValue={actionData?.values?.username}
        error={actionData?.errors?.username}
      />
      <Input
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        icon={<i className="fas fa-lock text-gray-500"></i>}
        error={actionData?.errors?.password}
      />

      <div className="mb-6 mt-10">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2" /> Signing in...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt mr-2" /> Sign In
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
