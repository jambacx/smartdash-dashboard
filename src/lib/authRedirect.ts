// utils/authRedirect.ts
import { GetServerSidePropsContext } from "next";

export const authRedirect = (context: GetServerSidePropsContext) => {
    const token = context.req.cookies.token || context.req.headers.token;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return null;
};
