import { Spin } from "antd";
import { FunctionComponent } from "react";
import useCan from "../../hooks/useCan";
import { Action } from "../../models/user";

interface CanProps {
    children: any
    action: Action
}

const Can: FunctionComponent<CanProps> = ({ children, action }) => {
    const [can, loading] = useCan(action)

    if (loading) {
        return <Spin />
    }
    if (can) {
        return children;
    }
    return null
}

export default Can;