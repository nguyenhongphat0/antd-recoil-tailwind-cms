import { FunctionComponent, Suspense } from "react";
import { Button, Divider, Select } from "antd";

interface AccountSelectorProps {
  disabled?: boolean
  logout?: boolean
}

const Content = (props: AccountSelectorProps) => {
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return <Select
    placeholder="Chọn tài khoản"
    className="w-full"
    disabled={props.disabled}
    dropdownRender={menu => (
      <div>
        <small className="p-4">Chọn tài khoản</small>
        <Divider className="mb-0 mt-2" />
        {menu}
        {props.logout && <>
          <Divider className="my-0" />
          <div className="px-2 pt-1">
            <Button block type="link" onClick={logout}>Đăng xuất</Button>
          </div>
        </>}
      </div>
    )}>
  </Select>
}

const AccountSelector: FunctionComponent<AccountSelectorProps> = (props) => {
  return <Suspense fallback={<Select loading className="w-full" />}>
    <Content {...props} />
  </Suspense>
}

export default AccountSelector;