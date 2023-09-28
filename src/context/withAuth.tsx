import { useAuth } from "./authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = <P,>(WrappedComponent: any) => {
  return (props: P) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) router.replace("/login"); // Redirect to login if user is not authenticated
    }, [user]);

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
