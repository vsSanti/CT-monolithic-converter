import React from 'react';
import { Layout, Breadcrumb, Typography } from 'antd';

import './styles.less';

const { Header, Content } = Layout;
const { Text } = Typography;
const Wrapper = ({ children }) => {
  return (
    <Layout id="wrapper-component" className="layout">
      <Header>
        <Text className="header-text">Desenvolvido por Lucas, Guilherme e Vinícius</Text>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Simulação</Breadcrumb.Item>
          <Breadcrumb.Item>Criar</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default Wrapper;
