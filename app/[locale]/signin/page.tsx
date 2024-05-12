import { AuthClient } from "@/components/auth/auth-client";
import { isAuthenticated } from "@/utils/amplify-utils";

const SignIn = async () => {
  return <AuthClient isSignedIn={await isAuthenticated()}/>;
};

export default SignIn;