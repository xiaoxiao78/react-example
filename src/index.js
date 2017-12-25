import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// 注意，要增加这句
module.hot && module.hot.accept()