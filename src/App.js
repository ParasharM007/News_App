import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
          <Route exact path="/" element={<News  key="general"  pagesize={12} category="general" />}/>
          <Route exact path="/business"  element={<News key="business"  pagesize={12} category="business" />}/>
          <Route exact path="/entertainment"element={<News  key="entertainment"  pagesize={12} category="entertainment" />}/>
          <Route exact path="/general"  element={<News key="general" pagesize={12} category="general" />}/>
          <Route exact path="/health"  element={<News key="health" pagesize={12} category="health" />}/>
          <Route exact path="/science"  element={<News key="science" pagesize={12} category="science" />}/>
          <Route exact path="/sports" element={<News  key="sports" pagesize={12} category="sports"/>}/>
          <Route exact path="/technology" element={<News  key="technology" pagesize={12} category="technology" />}/>
          </Routes>
        </Router>
        
      </div>
    )
  }
}
