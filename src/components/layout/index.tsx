import type { PropsWithChildren } from 'react'
import './styles.scss'
import Header from '../header'

const Layout = (props: PropsWithChildren) => {
  return (
    <div className='layout'>
      <Header />

      <>{props.children}</>
    </div>
  )
}

export default Layout
