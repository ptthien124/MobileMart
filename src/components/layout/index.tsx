import type { PropsWithChildren } from 'react'
import Header from '../header'
import './styles.scss'

const Layout = (props: PropsWithChildren) => {
  return (
    <div className='layout'>
      <Header />

      <>{props.children}</>
    </div>
  )
}

export default Layout
