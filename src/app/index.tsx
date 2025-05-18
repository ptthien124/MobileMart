import { ConfigProvider } from 'antd'
import { useState } from 'react'
import AppRouter from '../router'
import './styles/general.scss'
import { darkTheme, defaultTheme } from './styles/theme.antd'

const App = () => {
  const [isDarkMode] = useState(false)

  return (
    <div className='app'>
      <ConfigProvider theme={isDarkMode ? darkTheme : defaultTheme}>
        <AppRouter />
      </ConfigProvider>
    </div>
  )
}

export default App
