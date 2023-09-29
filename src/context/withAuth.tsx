// components/withAuth.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const Router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
      if (!token) {
        Router.replace("/login");
      }
    }, [token]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
