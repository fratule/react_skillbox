import React from 'react'
import { hot } from 'react-hot-loader/root'
import styles from './header.scss'

function Header() {
  return (
    <header>
      <h1 className={styles.example}>Hello React</h1>
    </header>
  )
}

export default hot(Header)
