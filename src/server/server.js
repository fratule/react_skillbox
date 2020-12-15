import express from 'express'
import ReactDOM from 'react-dom/server'
import { indexTemplate } from './indexTemplate'
import Header from '../shared/Header'

const app = express()
const port = 3000

app.use('/static', express.static('./dist/client'))

app.get('/', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(Header())),
  )
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
