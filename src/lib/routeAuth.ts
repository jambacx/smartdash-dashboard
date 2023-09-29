import { GetServerSidePropsContext } from "next";
import { authRedirect } from "./authRedirect";

const PROTECTED_ROUTES = ["/", "/dashboard", "/profile"];

export const routeAuth = async (context: GetServerSidePropsContext) => {
    const isProtectedRoute = PROTECTED_ROUTES.includes(context.resolvedUrl);

    if (isProtectedRoute) {
        return authRedirect(context);
    }

    return {
        props: {},
    };
};
