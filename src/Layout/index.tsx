import { FC } from 'react';
import { Layout, theme } from 'antd';
import styles from './index.module.less';
import { SideBar, AppHeader, AppMain } from './components';
const CLayout: FC = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const layoutProps = { colorBgContainer, borderRadiusLG };

    return (
        <Layout className={styles.layout}>
            <SideBar {...layoutProps} />
            <Layout>
                <AppHeader {...layoutProps} />

                <AppMain {...layoutProps} />
            </Layout>
        </Layout>
    );
};

export default CLayout;