import { ConfigProvider } from 'antd';
import { useState } from 'react';
import useAuthentication from '../hooks/useAuthentication';
import AppRouter from '../router';
import './styles/general.scss';
import { darkTheme, defaultTheme } from './styles/theme.antd';

const App = () => {
  const [isDarkMode] = useState(false);

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : defaultTheme}>
      <div className='app'>
        <AppRouter />
      </div>
    </ConfigProvider>
  );
};

export default App;
