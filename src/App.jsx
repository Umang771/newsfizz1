
import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
const App = () => {
  const apiKey ="eea24ea0ba7f40b0a1f9589151398db9";
  const [progress, setProgress] = useState()
  const setProgress1 = (progress) => {
    setProgress(progress)
  }
  return (
    <div style={{backgroundImage:"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"}}>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <NavBar/>
        {/* <News setProgress={setProgress1} apiKey={apiKey} category="sports"/> */}
        <Routes>
          console.log(apiKey);
          console.log(process.env.REACT_APP_APIKEY)
          <Route exact path="/" element={<News setProgress={setProgress1} apiKey={apiKey} key="general" category="general" />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress1} apiKey={apiKey} key="business" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress1} apiKey={apiKey} key="entertainment" category="entertainment" />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress1} apiKey={apiKey} key="health" category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress1} apiKey={apiKey} key="science" category="science" />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress1} apiKey={apiKey} key="sports" category="sports" />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress1} apiKey={apiKey} key="technology" category="technology" />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;

