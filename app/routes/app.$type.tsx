import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UserList } from "~/components/App";
import { routes } from "~/constant/routes";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    return json({ type: params.type });
};

export default function AppContent() {
    const { type = '' } = useLoaderData<typeof loader>();
    return (<>
        {routes.app.chat.includes(type) && <UserList/>}
        <div style={{ fontSize: "2rem", color: "orange" }}>
            {type}
        </div>
    </>);
}