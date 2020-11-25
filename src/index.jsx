import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Header } from './Header'

window.addEventListener('load', () => {
  ReactDOM.render(<Header />, document.querySelector('#root_react'))
})
