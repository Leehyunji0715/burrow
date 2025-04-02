import { AppNavigation } from "./AppNavigation";
import { HomeNavigation } from "./HomeNavigation";

type Props = {
    type: "homeNavigation" | "appNaviation"
};

export const Navigation = (props: Props) => {
    if (props.type === "homeNavigation") {
        return <HomeNavigation/>;
    }
    return <AppNavigation/>;
};