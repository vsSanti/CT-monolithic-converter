import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import validateMessages from 'utils/formValidateMessages';

import Routes from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider form={{ validateMessages }} locale={ptBR}>
        <Routes />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
