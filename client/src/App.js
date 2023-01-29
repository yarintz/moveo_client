import './App.css';
import React, {useEffect} from 'react';
import Lobby from './pages/Lobby';
import CodeBlock from './pages/CodeBlock';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {



  return (
<Router>
    <Routes>

{/*      
      <Switch> */}
      <Route path='/' element={<Lobby/>} />
      <Route path='/CodeBlock' element={<CodeBlock/>} />
        {/* <Route path="/Lobby" exact component={Lobby} />
        <Route path="/CodeBlock" exact component={CodeBlock} /> */}

      {/* </Switch> */}
    </Routes>
  </Router>
  );
}

export default App;