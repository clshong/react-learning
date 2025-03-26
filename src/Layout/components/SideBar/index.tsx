import { FC, useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import style from './index.module.less';
import { useLayout } from '../../../store/index';
import { items } from '../../../router/menu';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const SiderBar: FC<{ colorBgContainer: string }> = ({ colorBgContainer }) => {
  const { collapsed } = useLayout();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/home']);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 根据当前路由更新选中项
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  // 菜单点击处理：跳转页面
  const onClickMenu = useCallback(({ key }: { key: string }) => {
    navigate(key);
  }, [navigate]);

  // 处理菜单展开/折叠
  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  return (
    <Sider
      trigger={null}
      style={{ background: colorBgContainer, }}
      collapsible
      collapsed={collapsed}
    >
      <div className={style['sider-logo']}>
        <img
          className={style['sider-logo-img']}
          src="https://image.woshipm.com/wp-files/2021/12/ZtAFn75YpagtIoK9dE6h.jpg"
          alt="logo"
        />
      </div>
      <Menu
        style={{ background: colorBgContainer }}
        theme="light"
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClickMenu}
      />
    </Sider>
  );
};

export default SiderBar;
