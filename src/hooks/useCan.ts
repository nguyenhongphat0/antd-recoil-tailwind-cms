import { useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";
import { userState } from "../atoms/auth";
import { Action, Role } from "../models/user";

export const permissions: { [r in Role]: { [a in Action]?: boolean } } = {
    GUEST: {},
    EDITOR: {
        VIEW_STAT: true,
        VIEW_POST: true,
        VIEW_ACTIVITY: true,
        VIEW_TAG: true
    },
    ADMIN: {
        VIEW_STAT: true,
        VIEW_POST: true,
        VIEW_ACTIVITY: true,
        VIEW_PERMISSION: true,
        SAVE_GROUP: true,
        VIEW_TAG: true,
        SAVE_TAG: true,
    },
}

const useCan = (action: Action) => {
    const user = useRecoilValueLoadable(userState);

    const can = useMemo(() => {
        if (user.state === 'hasValue' && user.contents && permissions[user.contents.role][action]) {
            return true;
        } else {
            return false;
        }
    }, [user, action])


    return [can, user.state === 'loading']
}

export default useCan