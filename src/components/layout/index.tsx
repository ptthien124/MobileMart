import type { PropsWithChildren } from 'react'
import Header from '../header'
import './styles.scss'

const Layout = (props: PropsWithChildren) => {
  return (
    <div className='layout-wrapper'>
      <Header />

      <div className='layout'>
        <div className='layout-content'>{props.children}</div>
      </div>
    </div>
  )
}

export default Layout
