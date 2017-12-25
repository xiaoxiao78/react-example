import React, { Component } from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import Author from '_/components/author'
import Category from '_/components/category'
import Book from '_/components/book'

import '_/style/index.sass'

function App() {
  return  (
    <BrowserRouter>
      <div>
        <div>
          <Link to="/author">作者</Link>
          <Link to="/category">分类</Link>
          <Link to="/book">书籍</Link>
        </div>
        <div>
          <Route path="/author" component={Author} />
          <Route path="/category" component={Category} />
          <Route path="/author" component={Author} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App