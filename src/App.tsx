import { useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppMenu from './components/menu';
import { RecoilRoot } from 'recoil';
import Authorized from './components/authorized';
import viVN from 'antd/lib/locale/vi_VN';
import Dashboard from './pages/dashboard';
const { Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      locale={{
        ...viVN,
        Image: {
          preview: 'Xem trước'
        }
      }}>
      <RecoilRoot>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapsed} width={250}>
              <AppMenu />
            </Sider>
            <Layout className="site-layout">
              <Authorized>
                <Switch>
                  <Route path="/">
                    <Dashboard />
                  </Route>
                </Switch>
              </Authorized>
            </Layout>
          </Layout>
        </Router>
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;
