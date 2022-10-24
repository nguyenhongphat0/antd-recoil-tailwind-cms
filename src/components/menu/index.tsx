import { Menu } from 'antd';
import {
  PieChartFilled,
  LineChartOutlined,
  EditFilled,
  HistoryOutlined,
  UsergroupAddOutlined,
  HighlightOutlined,
  TagsOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AccountSelector from '../account-selector';
import { useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from 'recoil';
import { userState } from '../../atoms/auth';
import { useMemo } from 'react';
import useCan from '../../hooks/useCan';

export default function AppMenu() {
  const location = useLocation()
  const user = useRecoilValueLoadable(userState)
  const showMenu = useMemo(() => {
    if (user.state === 'loading') {
      return false
    }
    if (typeof user.contents === 'number') {
      return false
    }
    return true
  }, [user])

  const [canViewStat] = useCan('VIEW_STAT')
  const [canViewPost] = useCan('VIEW_POST')
  const [canViewTag] = useCan('VIEW_TAG')
  const [canViewUser] = useCan('VIEW_PERMISSION')
  const [canViewLog] = useCan('VIEW_ACTIVITY')

  return <Menu theme="light" selectedKeys={[location.pathname]} mode="inline">
    <div className="logo w-full text-center my-6 px-2">
      <img src="/logo.svg" alt="Logo" className="w-full h-8 my-4 hidden-collapsed" />
      <img src="/icon.svg" alt="Logo" className="w-full h-8 my-4 hidden-expanded" />
      <div className="hidden-collapsed text-gray-500">Admin Portal</div>
    </div>
    {showMenu && <>
      <Menu.Item key="/" icon={<LineChartOutlined />}>
        <Link to="/">
          Tổng quan
        </Link>
      </Menu.Item>
      <div className="px-4 pb-2 hidden-collapsed">
        <AccountSelector logout />
      </div>
      {canViewStat && <Menu.Item key="/insights" icon={<PieChartFilled />}>
        <Link to="/insights">
          Thống kê
        </Link>
      </Menu.Item>}
      {canViewPost && <Menu.SubMenu key="/manage" icon={<EditFilled />} title="Quản lý">
        <Menu.Item key="/posts" icon={<HighlightOutlined />}>
          <Link to="/posts">
            Bài viết
          </Link>
        </Menu.Item>
        {canViewTag && <Menu.Item key="/tagging" icon={<TagsOutlined />}>
          <Link to="/tagging">
            Thẻ
          </Link>
        </Menu.Item>}
      </Menu.SubMenu>
      }

      {canViewUser && <Menu.Item key="/users" icon={<UsergroupAddOutlined />}>
        <Link to="/users">
          Phân quyền
        </Link>
      </Menu.Item>}

      {canViewLog && <Menu.Item key="/logs" icon={<HistoryOutlined />}>
        <Link to="/logs">
          Nhật ký hoạt động
        </Link>
      </Menu.Item>}
    </>}
  </Menu>
}