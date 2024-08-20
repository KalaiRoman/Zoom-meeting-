import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './Home';
import JoinMetting from './JoinMetting';
function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Home/>} exact={true}/>
  <Route path="/join/:roomID" element={<JoinMetting/>} />
  </Routes>    
  </div>
  )
}

export default App