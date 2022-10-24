import { FunctionComponent } from "react";
import { Result, Skeleton } from "antd"
import { useRecoilValueLoadable } from "recoil";
import { userState } from "../../atoms/auth";

interface AuthorizedProps {
  children: any
}

const Authorized: FunctionComponent<AuthorizedProps> = ({ children }) => {
  const user = useRecoilValueLoadable(userState)

  if (user.state === 'loading') {
    return <Skeleton className="px-4" loading />
  }

  if (!user.contents) {
    return <Result
      status="403"
      title="Access denied"
      subTitle="You are not authorized to access this page."
    />
  }

  return children;
}

export default Authorized;