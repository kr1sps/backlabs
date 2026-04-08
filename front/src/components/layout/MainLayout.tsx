import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Space, Typography } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems = [
    {
      key: '/products',
      icon: <HomeOutlined />,
      label: <Link to="/products">Каталог</Link>,
    },
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/cart">Корзина</Link>,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo" style={{ color: 'white', marginRight: '20px', fontSize: '20px' }}>
            TechStore
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <Space>
          {user ? (
            <>
              <Text style={{ color: 'white' }}>{user.name}</Text>
              <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: 'white' }}>
                Выйти
              </Button>
            </>
          ) : (
            <Button type="link" icon={<UserOutlined />} onClick={() => navigate('/login')} style={{ color: 'white' }}>
              Войти
            </Button>
          )}
        </Space>
      </Header>
      <Content style={{ padding: '24px 50px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Лабораторные работы по веб-разработке ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default MainLayout;